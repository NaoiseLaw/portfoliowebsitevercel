import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DATA } from "@/data/resume";
import { getProjectPosts } from "@/data/projects";

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

    const { message, sessionId } = await req.json();

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

    const contextBlock = `
Context (trusted facts):
Site: ${DATA.url}
${resumeContext}

${projectsContext}
`;

    const prompt = `${instruction}\n\n${contextBlock}\n\nUser question: ${trimmed}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        topP: 0.9,
        maxOutputTokens: 256,
      },
    });

    const text = result?.response?.text?.() || "I’m not fully sure from the available context—could you share a bit more?";

    return NextResponse.json({ message: text, sessionId: sessionId || null });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process chat message", message: err?.message || "Unknown error" },
      { status: 500 },
    );
  }
}


