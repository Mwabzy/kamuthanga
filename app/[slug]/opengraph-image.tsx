import { ImageResponse } from "next/og";
import { properties, getProperty } from "@/data/properties";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = "Property preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One OG image per property slug, generated at build time.
export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  const name = property?.name ?? site.name;
  const tagline = property?.tagline ?? site.tagline;
  const location = property?.location ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #2F4A3C 0%, #1f3328 100%)",
          color: "#FBFAF6",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#7B9A82",
            }}
          />
          <span style={{ fontSize: 30, letterSpacing: 2, color: "#C9B8A3" }}>
            {site.name.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {location && (
            <span style={{ fontSize: 28, color: "#C9B8A3" }}>{location}</span>
          )}
          <span style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05 }}>
            {name}
          </span>
          <span style={{ fontSize: 34, color: "rgba(251,250,246,0.85)" }}>
            {tagline}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
