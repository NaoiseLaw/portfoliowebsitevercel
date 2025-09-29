import { NextRequest, NextResponse } from "next/server";
import { incrementFaq, topFaqs } from "../_store";

export async function GET() {
  const items = await topFaqs(20);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 });
  }
  await incrementFaq(question);
  return NextResponse.json({ ok: true });
}


