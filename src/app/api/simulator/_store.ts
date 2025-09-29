const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function upstash(cmd: string[], parseJson = true): Promise<any> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  const res = await fetch(UPSTASH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Upstash REST format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commands: [cmd as any],
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return parseJson ? data : null;
}

export async function incrementFaq(question: string): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  const q = question.trim().toLowerCase();
  if (!q) return;
  await upstash(["ZINCRBY", "faq:counts", "1", q]);
}

export async function topFaqs(limit = 10): Promise<string[]> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return [];
  const res = await upstash(["ZREVRANGE", "faq:counts", "0", String(limit - 1)]);
  if (!res || !Array.isArray(res.result)) return [];
  return res.result as string[];
}

export async function appendChat(personaKey: string, user: string, ai: string): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  const key = `chat:${personaKey}`;
  const entry = JSON.stringify({ user, ai, ts: Date.now() });
  await upstash(["RPUSH", key, entry]);
  await upstash(["LTRIM", key, "-200", "-1"]); // keep last 200
}

export async function recentChats(personaKey: string, limit = 10): Promise<{ user: string; ai: string }[]> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return [];
  const key = `chat:${personaKey}`;
  const res = await upstash(["LRANGE", key, String(-limit), "-1"]);
  if (!res || !Array.isArray(res.result)) return [];
  const arr = res.result as string[];
  return arr
    .map((s) => {
      try { return JSON.parse(s); } catch { return null; }
    })
    .filter(Boolean)
    .map((o: any) => ({ user: String(o.user || ""), ai: String(o.ai || "") }));
}


