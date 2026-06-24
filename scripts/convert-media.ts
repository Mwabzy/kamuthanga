/* eslint-disable no-console */
/**
 * Media conversion pipeline for Mwabili.
 *
 * The owner uploads raw iPhone media — `.heic` photos and `.mov` videos — which
 * browsers do NOT reliably render. This script converts them to web formats:
 *
 *   .heic / .heif  ->  .webp                      (via sharp, fallback heic-convert)
 *   .mov / .mp4    ->  .mp4 (H.264) + .jpg poster (via ffmpeg / fluent-ffmpeg)
 *   .jpg / .png    ->  .webp                      (via sharp)
 *
 * Layout:
 *   media-src/<slug>/...   <- drop raw files here (git-ignored)
 *   public/properties/<slug>/...  <- converted, web-ready output (committed)
 *
 * Usage:
 *   npm run convert-media               # convert every slug under media-src/
 *   npm run convert-media -- kamuthanga # convert a single slug
 *
 * REQUIREMENTS:
 *   - `sharp`, `heic-convert`, `fluent-ffmpeg` are installed as devDependencies.
 *   - ffmpeg MUST be installed on your machine and available on PATH.
 *       macOS:   brew install ffmpeg
 *       Windows: winget install Gyan.FFmpeg   (or choco install ffmpeg)
 *       Linux:   sudo apt install ffmpeg
 *
 * The original filename (sans extension) is preserved, so a source file named
 * `cabin-1.heic` becomes `cabin-1.webp` — reference it in data/properties.ts as
 * `/properties/<slug>/cabin-1.webp`.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
// heic-convert is loaded lazily only if sharp can't read a HEIC file.

const SRC_ROOT = path.resolve(process.cwd(), "media-src");
const OUT_ROOT = path.resolve(process.cwd(), "public", "properties");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const HEIC_EXTS = new Set([".heic", ".heif"]);
const VIDEO_EXTS = new Set([".mov", ".mp4", ".m4v"]);

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function convertImage(src: string, outDir: string, base: string) {
  const out = path.join(outDir, `${base}.webp`);
  await sharp(src).rotate().webp({ quality: 82 }).toFile(out);
  console.log(`  image  ✓ ${path.basename(out)}`);
}

async function convertHeic(src: string, outDir: string, base: string) {
  const out = path.join(outDir, `${base}.webp`);
  try {
    // Newer sharp builds (with libheif) can read HEIC directly.
    await sharp(src).rotate().webp({ quality: 82 }).toFile(out);
  } catch {
    // Fallback: decode HEIC -> JPEG buffer, then sharp -> webp.
    const heicConvert = (await import("heic-convert")).default;
    const inputBuffer = await fs.readFile(src);
    const jpegBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.9,
    });
    await sharp(jpegBuffer).rotate().webp({ quality: 82 }).toFile(out);
  }
  console.log(`  heic   ✓ ${path.basename(out)}`);
}

function convertVideo(
  src: string,
  outDir: string,
  base: string,
): Promise<void> {
  const outVideo = path.join(outDir, `${base}.mp4`);
  const outPoster = path.join(outDir, `${base}-poster.jpg`);

  const transcode = new Promise<void>((resolve, reject) => {
    ffmpeg(src)
      .outputOptions([
        "-c:v libx264",
        "-preset slow",
        "-crf 23",
        "-pix_fmt yuv420p",
        "-movflags +faststart", // web streaming: moov atom at the front
        "-c:a aac",
        "-b:a 128k",
        "-vf scale='min(1920,iw)':-2", // cap width at 1920, keep aspect, even dims
      ])
      .on("end", () => resolve())
      .on("error", reject)
      .save(outVideo);
  });

  const poster = new Promise<void>((resolve, reject) => {
    ffmpeg(src)
      .on("end", () => resolve())
      .on("error", reject)
      .screenshots({
        timestamps: ["1"], // 1s in
        filename: `${base}-poster.jpg`,
        folder: outDir,
        size: "1280x?",
      });
  });

  return Promise.all([transcode, poster]).then(() => {
    console.log(
      `  video  ✓ ${path.basename(outVideo)} (+ ${path.basename(outPoster)})`,
    );
  });
}

async function processSlug(slug: string) {
  const srcDir = path.join(SRC_ROOT, slug);
  const outDir = path.join(OUT_ROOT, slug);
  await ensureDir(outDir);

  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile());

  console.log(`\n• ${slug} (${files.length} files)`);
  if (files.length === 0) {
    console.log("  (no files — drop raw HEIC/MOV/JPG here)");
    return;
  }

  for (const entry of files) {
    const src = path.join(srcDir, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const base = path.basename(entry.name, path.extname(entry.name));

    try {
      if (HEIC_EXTS.has(ext)) await convertHeic(src, outDir, base);
      else if (IMAGE_EXTS.has(ext)) await convertImage(src, outDir, base);
      else if (VIDEO_EXTS.has(ext)) await convertVideo(src, outDir, base);
      else console.log(`  skip   – ${entry.name} (unsupported)`);
    } catch (err) {
      console.error(`  ERROR  ✗ ${entry.name}:`, (err as Error).message);
      process.exitCode = 1;
    }
  }
}

async function main() {
  const requested = process.argv.slice(2);

  try {
    await fs.access(SRC_ROOT);
  } catch {
    console.error(
      `No media-src/ directory found at ${SRC_ROOT}.\n` +
        `Create it and add per-property folders, e.g. media-src/kamuthanga/hero.heic`,
    );
    process.exitCode = 1;
    return;
  }

  let slugs = requested;
  if (slugs.length === 0) {
    const entries = await fs.readdir(SRC_ROOT, { withFileTypes: true });
    slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  }

  if (slugs.length === 0) {
    console.log("No property folders found under media-src/. Nothing to do.");
    return;
  }

  console.log(`Converting media for: ${slugs.join(", ")}`);
  for (const slug of slugs) {
    await processSlug(slug);
  }
  console.log("\nDone. Commit the converted files in public/properties/.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
