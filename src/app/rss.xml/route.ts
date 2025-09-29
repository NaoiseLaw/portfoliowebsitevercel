import { NextResponse } from "next/server";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

export async function GET() {
  const posts = await getBlogPosts();
  const site = DATA.url;

  const items = posts
    .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
    .map((p) => `
      <item>
        <title><![CDATA[${p.metadata.title}]]></title>
        <link>${site}/blog/${p.slug}</link>
        <guid>${site}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.metadata.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${p.metadata.summary}]]></description>
      </item>
    `)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${DATA.name} Blog</title>
      <link>${site}</link>
      <description>${DATA.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}


