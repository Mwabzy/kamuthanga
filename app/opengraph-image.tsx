import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hub-level OG image (the "link in bio" share card).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #2F4A3C 0%, #1f3328 100%)",
          color: "#FBFAF6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#7B9A82",
            }}
          />
          <span style={{ fontSize: 88, fontWeight: 600 }}>{site.name}</span>
        </div>
        <span style={{ fontSize: 40, color: "rgba(251,250,246,0.85)" }}>
          {site.tagline}
        </span>
      </div>
    ),
    size,
  );
}
