import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", domain: process.env.NEXT_PUBLIC_SITE_URL || null, time: new Date().toISOString() });
}


