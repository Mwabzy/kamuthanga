"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/data/types";
import ImagePreload from "./ImagePreload";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

/**
 * "A look around" — an asymmetric BENTO MOSAIC.
 *
 * Tiles interlock at two sizes (a 2×2 feature tile that zig-zags between the
 * top-left and bottom-right of each 5-tile block, framed by 1×1 tiles), so the
 * eye keeps moving as you scroll. Each tile fades/slides in on scroll (Reveal)
 * and gently zooms on hover. Photos open in the shared Lightbox (swipeable);
 * any video plays inline.
 *
 * The span pattern tiles a 4-column grid cleanly in blocks of five, and also
 * works at the 2-column mobile width.
 */

/** Bento span for tile `i` — 2×2 feature or 1×1, alternating feature corner. */
function bentoTile(i: number): string {
  const block = Math.floor(i / 5);
  const featurePos = block % 2 === 0 ? 0 : 2; // top-left, then bottom-right
  return i % 5 === featurePos
    ? "col-span-2 row-span-2"
    : "col-span-1 row-span-1";
}

export default function Gallery({ media }: { media: Media[] }) {
  const images = media.filter((m) => m.type === "image");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Start fetching the full-size photo the moment someone shows intent, so the
  // lightbox opens on a cached image rather than a fresh download. Thumbnails
  // are a much smaller variant, so they do not warm it themselves.
  const [warm, setWarm] = useState<Media[]>([]);
  const warmUp = (m: Media) =>
    setWarm((prev) =>
      prev.some((p) => p.src === m.src) ? prev : [...prev, m],
    );

  if (media.length === 0) return null;

  return (
    <>
      <div className="grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[13rem]">
        {media.map((m, i) => (
          <Reveal
            key={m.src}
            delay={(i % 5) * 70}
            className={bentoTile(i)}
          >
            <figure className="group relative h-full w-full overflow-hidden rounded-2xl bg-offwhite shadow-soft">
              {m.type === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                  poster={m.poster}
                  playsInline
                >
                  <source src={m.src} type="video/mp4" />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenIndex(images.indexOf(m))}
                  onPointerEnter={() => warmUp(m)}
                  onTouchStart={() => warmUp(m)}
                  onFocus={() => warmUp(m)}
                  className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest/50"
                  aria-label={`Open image: ${m.alt}`}
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10"
                  />
                </button>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      <ImagePreload media={warm} />

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}
