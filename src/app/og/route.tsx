import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Portfolio";
  const subtitle = searchParams.get("subtitle") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B0B0F",
          color: "white",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700 }}>{title}</div>
        {subtitle && (
          <div style={{ marginTop: 12, fontSize: 28, opacity: 0.9 }}>{subtitle}</div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}


