/* eslint-disable no-console */
/**
 * Generates static Open Graph share cards (1200x630 PNG) into public/og/.
 *
 *   public/og/home.png        # the hub "link in bio" card
 *   public/og/<slug>.png      # one per property
 *
 * Run after editing brand copy or adding a property:
 *   npm run generate-og
 *
 * We render static PNGs with sharp instead of @vercel/og's runtime route so OG
 * generation is deterministic, offline, and dependency-light across platforms.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "og");

// Pull live content from the typed data file via a tiny tsx-free import shim:
// we read the compiled values by importing the TS through a JSON-ish parse is
// brittle, so instead we re-declare the brand here and read properties names by
// importing the module with a loader. Simplest robust path: import via file URL
// using Node's TS stripping is unavailable, so we parse the source minimally.
// To keep it dependency-free we just import the brand + property summaries that
// this script needs from a small generated manifest produced inline below.

async function loadContent() {
  // Read brand from lib/site.ts and property name/tagline/location/slug/status
  // from data/properties.ts using lightweight regex extraction (no TS runtime).
  const site = await fs.readFile(path.join(ROOT, "lib", "site.ts"), "utf8");
  const brand = /name:\s*"([^"]+)"/.exec(site)?.[1] ?? "Mwabili";
  const tagline = /tagline:\s*"([^"]+)"/.exec(site)?.[1] ?? "";

  const data = await fs.readFile(
    path.join(ROOT, "data", "properties.ts"),
    "utf8",
  );
  // Match each property block's slug/name/tagline/location.
  const props = [];
  const re =
    /slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*tagline:\s*"([^"]+)",\s*\n\s*location:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(data))) {
    props.push({ slug: m[1], name: m[2], tagline: m[3], location: m[4] });
  }
  return { brand, tagline, props };
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function card({ brand, eyebrow, title, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2F4A3C"/>
      <stop offset="1" stop-color="#1f3328"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="86" cy="84" r="9" fill="#7B9A82"/>
  <text x="112" y="94" font-family="Arial, sans-serif" font-size="30" letter-spacing="3" fill="#C9B8A3">${esc(brand.toUpperCase())}</text>
  ${eyebrow ? `<text x="80" y="380" font-family="Arial, sans-serif" font-size="28" letter-spacing="1" fill="#C9B8A3">${esc(eyebrow)}</text>` : ""}
  <text x="78" y="470" font-family="Georgia, serif" font-size="84" font-weight="600" fill="#FBFAF6">${esc(title)}</text>
  <text x="80" y="528" font-family="Arial, sans-serif" font-size="34" fill="#FBFAF6" opacity="0.82">${esc(sub)}</text>
</svg>`;
}

async function render(svg, file) {
  const out = path.join(OUT, file);
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("✓ og/" + file);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const { brand, tagline, props } = await loadContent();

  await render(
    card({ brand, eyebrow: "", title: brand, sub: tagline }),
    "home.png",
  );

  for (const p of props) {
    await render(
      card({
        brand,
        eyebrow: p.location,
        title: p.name,
        sub: p.tagline,
      }),
      `${p.slug}.png`,
    );
  }
  console.log("Done. OG cards written to public/og/.");
}

// Allow running directly: `node scripts/generate-og.mjs`
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
