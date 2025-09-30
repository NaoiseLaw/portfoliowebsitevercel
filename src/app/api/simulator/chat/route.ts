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
    const lines: string[] = ["Projects:"];
    top.forEach((p) => {
      const tech = p.metadata.technologies?.slice(0, 8).join(", ") || "";
      lines.push(`- ${p.metadata.title} (${p.metadata.publishedAt}) — ${p.metadata.summary}${tech ? ` [Tech: ${tech}]` : ""}`);
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
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing GOOGLE_API_KEY" },
        { status: 500 },
      );
    }

    // Optional origin allow-list (set NEXT_PUBLIC_SITE_URL for prod domain)
    const allowed = process.env.NEXT_PUBLIC_SITE_URL || "";
    if (allowed) {
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const resumeContext = buildResumeContext();
    const projectsContext = await buildProjectsContext();

    const instruction = `
You are acting as Naoise Law inside an interactive portfolio simulator.
Use ONLY the facts in the provided context when answering. If the answer is not covered, say you are unsure and ask a brief clarifying question.
Style: friendly, professional, concise (1-3 sentences), concrete; include metrics or technologies when relevant.
Avoid speculation, personal data not present in context, or commitments.
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

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        topP: 0.9,
        maxOutputTokens: 256,
      },
    });

    const text = result?.response?.text?.() || "I’m not fully sure from the available context—could you share a bit more?";

    // Persist this turn and update FAQ stats
    try {
      await appendChat(personaKey, trimmed, text);
      await incrementFaq(trimmed);
    } catch {}

    return NextResponse.json({ message: text, sessionId: sessionId || null });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process chat message", message: err?.message || "Unknown error" },
      { status: 500 },
    );
  }
}


