import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DATA } from "@/data/resume";
import { getProjectPosts } from "@/data/projects";

// Simple in-memory session storage (use Redis in production)
const sessions = new Map<string, {
  id: string;
  messages: Array<{ role: string; content: string }>;
  createdAt: number;
  lastActivity: number;
}>();

// Rate limiting per IP
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

function getSession(sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      messages: [],
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
  }
  return sessions.get(sessionId)!;
}

function buildPortfolioContext() {
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

function generateSuggestions(userMessage: string, aiResponse: string): string[] {
  const suggestions: string[] = [];
  
  // Topic-based suggestions
  if (userMessage.toLowerCase().includes('ai') || 
      userMessage.toLowerCase().includes('technical')) {
    suggestions.push('Tell me about your leadership experience');
    suggestions.push('What design projects have you worked on?');
  } else if (userMessage.toLowerCase().includes('leadership') || 
             userMessage.toLowerCase().includes('team')) {
    suggestions.push('Describe your technical skills');
    suggestions.push('What\'s your approach to innovation?');
  } else if (userMessage.toLowerCase().includes('design') || 
             userMessage.toLowerCase().includes('user')) {
    suggestions.push('Tell me about your AI projects');
    suggestions.push('How do you manage stakeholders?');
  } else {
    // Default suggestions
    suggestions.push('What\'s your biggest achievement?');
    suggestions.push('Tell me about your hackathon win');
    suggestions.push('How do you approach problem-solving?');
  }
  
  return suggestions.slice(0, 3);
}

// Cleanup old sessions periodically
setInterval(() => {
  const now = Date.now();
  const timeout = 30 * 60 * 1000; // 30 minutes
  
  for (const [id, session] of sessions.entries()) {
    if (now - session.lastActivity > timeout) {
      sessions.delete(id);
      console.log(`Cleaned up chat session: ${id}`);
    }
  }
}, 5 * 60 * 1000); // Run every 5 minutes

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing GOOGLE_API_KEY/GOOGLE_AI_API_KEY" },
        { status: 500 }
      );
    }

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return NextResponse.json(
        { error: "Invalid JSON format", code: "INVALID_JSON" },
        { status: 400 }
      );
    }

    const { message, sessionId, history = [] } = requestBody;
    
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.ip || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests, please try again later.", code: "RATE_LIMIT_EXCEEDED", retryAfter: 60 },
        { status: 429 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required", code: "INVALID_MESSAGE" },
        { status: 400 }
      );
    }
    
    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)", code: "MESSAGE_TOO_LONG" },
        { status: 400 }
      );
    }

    // Get or create session
    const session = getSession(sessionId);
    session.lastActivity = Date.now();

    // Check message limit per session
    if (session.messages.length >= 40) { // 20 exchanges
      return NextResponse.json(
        { error: "Session message limit reached. Please start a new conversation.", code: "SESSION_LIMIT_EXCEEDED" },
        { status: 429 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 500
      }
    });

    const portfolioContext = buildPortfolioContext();
    const projectsContext = await buildProjectsContext();

    const systemPrompt = `You are an AI assistant representing Naoise Law, an AI Product Manager with extensive experience.

TECHNICAL BACKGROUND:
- Won LSE's hackathon building an ML platform with 94% accuracy
- Expertise in Python, machine learning, and AI systems
- Experience with $1.5B automation projects
- Strong technical foundation in AI/ML development

LEADERSHIP EXPERIENCE:
- Managed $1.5B in operations
- Led teams of 20+ people
- Expert in stakeholder management
- Proven track record in team building

DESIGN & INNOVATION:
- User-centered design approach
- Extensive user research experience
- Product discovery expertise
- Government-adopted system design

PERSONALITY:
- Professional but approachable
- Enthusiastic about technology and problem-solving
- Clear communicator
- Results-oriented

INSTRUCTIONS:
- Keep responses concise (2-3 paragraphs max)
- Be helpful and informative
- If asked about specific experiences, provide concrete examples
- If the question isn't about Naoise's experience, politely redirect
- Encourage users to explore the portfolio website
- For technical questions, provide depth but remain accessible

IMPORTANT BOUNDARIES:
- Only discuss Naoise Law's professional experience
- Do not make up information not in the context
- If you don't know something, suggest exploring the portfolio
- Do not provide personal information beyond professional context

Context (trusted facts):
Site: ${DATA.url}
${portfolioContext}

${projectsContext}`;

    // Build conversation history
    const chatHistory = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will represent Naoise Law professionally and accurately based on the context provided.' }]
      },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500
      }
    });

    // Send message
    let result, response, responseText;
    try {
      result = await chat.sendMessage(message);
      response = await result.response;
      responseText = response.text();
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        { error: "AI service temporarily unavailable", code: "AI_SERVICE_ERROR" },
        { status: 503 }
      );
    }

    // Save to session
    session.messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: responseText }
    );

    // Generate suggestions
    const suggestions = generateSuggestions(message, responseText);

    return NextResponse.json({
      response: responseText,
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
      suggestions: suggestions
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { error: "An error occurred processing your request", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
