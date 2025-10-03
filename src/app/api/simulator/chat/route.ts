import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DATA } from "@/data/resume";
import { getProjectPosts } from "@/data/projects";
import { appendChat, incrementFaq, recentChats } from "../_store";

function buildResumeContext() {
  const lines: string[] = [];
  lines.push(`Name: ${DATA.name}`);
  if (DATA.description) lines.push(`Headline: ${DATA.description}`);
  if (DATA.location) lines.push(`Location: ${DATA.location}`);
  if (Array.isArray(DATA.skills) && DATA.skills.length) {
    const skillNames = DATA.skills.map((s: any) => (typeof s === "string" ? s : s?.name)).filter(Boolean).slice(0, 15);
    if (skillNames.length) lines.push(`Skills: ${skillNames.join(", ")}`);
  }
  if (Array.isArray(DATA.work) && DATA.work.length) {
    const recent = DATA.work.slice(0, 3)
      .map((w: any) => `${w.title} @ ${w.company} (${w.dates}) — ${w.description ?? ""}`)
      .filter(Boolean);
    if (recent.length) {
      lines.push("Recent roles:");
      lines.push(...recent);
    }
  }
  return lines.join("\n");
}

async function buildProjectsContext() {
  try {
    const posts = await getProjectPosts();
    const top = posts
      .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
      .slice(0, 5);
    const lines: string[] = ["Projects (with links):"];
    top.forEach((p) => {
      const tech = p.metadata.technologies?.slice(0, 8).join(", ") || "";
      const url = `${DATA.url}/projects/${p.slug}`;
      lines.push(`- ${p.metadata.title} (${p.metadata.publishedAt}) — ${p.metadata.summary}${tech ? ` [Tech: ${tech}]` : ""} — URL: ${url}`);
    });
    return lines.join("\n");
  } catch {
    return "";
  }
}

// Simple in-memory token bucket rate limiter per IP
type Bucket = { tokens: number; updatedAtMs: number };
const buckets = new Map<string, Bucket>();
const RATE_LIMIT_CAPACITY = 10; // 10 requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip) || { tokens: RATE_LIMIT_CAPACITY, updatedAtMs: now };
  const elapsed = now - bucket.updatedAtMs;
  const refill = Math.floor(elapsed / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_CAPACITY;
  bucket.tokens = Math.min(RATE_LIMIT_CAPACITY, bucket.tokens + refill);
  bucket.updatedAtMs = now;
  if (bucket.tokens <= 0) {
    buckets.set(ip, bucket);
    return true;
  }
  bucket.tokens -= 1;
  buckets.set(ip, bucket);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Accept either env var name to avoid configuration mismatches
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing GOOGLE_API_KEY/GOOGLE_AI_API_KEY" },
        { status: 500 },
      );
    }

    // Optional origin allow-list (set NEXT_PUBLIC_SITE_URL for prod domain)
    const allowed = process.env.NEXT_PUBLIC_SITE_URL || "";
    if (process.env.NODE_ENV === "production" && allowed) {
      try {
        const allowedHost = new URL(allowed).host.replace(/^www\./, "");
        const requestHost = req.nextUrl.host.replace(/^www\./, "");
        const isPreview = requestHost.endsWith(".vercel.app");
        if (allowedHost && requestHost && requestHost !== allowedHost && !isPreview) {
          return NextResponse.json(
            { error: "Forbidden: invalid origin host" },
            { status: 403 },
          );
        }
      } catch {
        // If parsing fails, skip allow-list enforcement
      }
    }

    const { message, sessionId, history, persona } = await req.json();
    
    // Debug logging
    console.log("📝 Received message:", message);
    console.log("👤 Persona:", persona);
    console.log("📚 History length:", history?.length || 0);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.ip || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 },
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format", message: "Message is required and must be a string" },
        { status: 400 },
      );
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: "Empty message" },
        { status: 400 },
      );
    }
    if (trimmed.length > 500) {
      return NextResponse.json(
        { error: "Message too long. Please keep under 500 characters." },
        { status: 413 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const resumeContext = buildResumeContext();
    const projectsContext = await buildProjectsContext();
    
    console.log("📋 Resume context:", resumeContext.substring(0, 200) + "...");
    console.log("🚀 Projects context:", projectsContext.substring(0, 200) + "...");

    const instruction = `
You are Naoise Law answering questions in a simulated interview on my portfolio site.

Rules and guardrails:
- Stay in character as me (first person: "I").
- Ground answers ONLY in the provided context (resume, projects, skills). Do not invent projects or experience.
- If asked something not covered, say you're unsure and ask ONE brief clarifying question; optionally suggest a relevant topic from my background.
- Deflect overly personal questions (e.g., age, address, family, salary history) with a polite line like: "I'd prefer to discuss that in a real conversation," and redirect back to my background.
- Do not share contact details beyond what is already public.
- If the question is off-topic, briefly steer back to my experience or projects.

Style:
- Professional, conversational, and enthusiastic about tech and product work.
- Aim for 2–3 short paragraphs (2–6 sentences each). Be concise and concrete; include metrics, technologies, and outcomes when relevant.
- If a persona is provided (technical, leadership, design), emphasize that angle.
 - When referencing a specific project or relevant skill page, include a markdown link to the project page if available (format: [Project Name](https://...)).

Common interview intents:
- "Tell me about yourself" → connect LSE MSc, AI/product focus, and prior roles (SEIC, Bank of Ireland, Grant Thornton) with a product management narrative.
- "Biggest achievement" → highlight hackathon win (94% accuracy ML), enterprise automation impact (e.g., $1.5B operations, 65% efficiency gains), or notable project outcomes.
- "Walk me through Project X" → outline problem → approach → technologies → result/metrics.
- "Why product management?" → user-centric, impact-driven, blend of tech + strategy.
- "Strengths/weaknesses" → strengths tied to evidence; weaknesses framed with mitigation.
`;

    const personaBlock = persona ? `\nCharacter Persona:\nName: ${persona.name || "Naoise Law"}\nRole: ${persona.role || ""}\nPersonality: ${persona.personality || ""}\nQuirk: ${persona.quirk || ""}\n` : "";

    const contextBlock = `
Context (trusted facts):
Site: ${DATA.url}
${resumeContext}

${projectsContext}
`;

    let historyBlock = "";
    if (Array.isArray(history) && history.length > 0) {
      const last = history.slice(-6);
      historyBlock =
        "\nRecent conversation (user -> you):\n" +
        last
          .map((h: any) => `User: ${String(h.user || "").slice(0, 500)}\nYou: ${String(h.ai || "").slice(0, 500)}`)
          .join("\n");
    }

    // Augment with server-side recent history (cross-session) if available
    const personaKey = `${persona?.name || "Naoise Law"}|${persona?.role || ""}`;
    const prior = await recentChats(personaKey, 6);
    if (prior.length > 0) {
      const priorBlock =
        "\nCross-session context:\n" +
        prior.map((h) => `User: ${h.user}\nYou: ${h.ai}`).join("\n");
      historyBlock += priorBlock;
    }

    const prompt = `${instruction}\n${personaBlock}\n${contextBlock}\n${historyBlock}\n\nUser question: ${trimmed}`;

    console.log("🤖 Full prompt length:", prompt.length);
    console.log("🔍 Prompt preview:", prompt.substring(0, 500) + "...");

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        topP: 0.9,
        maxOutputTokens: 640,
      },
    });

    const text = result?.response?.text?.() || "I'm not fully sure from the available context—could you share a bit more?";
    
    console.log("💬 Generated response:", text.substring(0, 200) + "...");
    console.log("📏 Response length:", text.length);
    console.log("🔍 Response type:", typeof text);

    // Persist this turn and update FAQ stats
    try {
      await appendChat(personaKey, trimmed, text);
      await incrementFaq(trimmed);
    } catch (error) {
      console.error("❌ Error persisting chat:", error);
    }

    const responseData = { 
      message: text, 
      sessionId: sessionId || null,
      timestamp: new Date().toISOString(),
      responseLength: text.length
    };
    
    console.log("📤 Sending response:", responseData);
    
    return NextResponse.json(responseData);
  } catch (err: any) {
    console.error("❌ Simulator chat error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    return NextResponse.json(
      { error: "Failed to process chat message", message: err?.message || "Unknown error", details: err?.toString?.() || "" },
      { status: 500 },
    );
  }
}


