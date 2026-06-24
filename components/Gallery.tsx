"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/data/types";
import Lightbox from "./Lightbox";

/**
 * Responsive masonry-ish gallery of photos + video.
 * - Images open in the shared Lightbox (Esc / arrows / tap-outside to close).
 * - Videos show a poster and play inline on tap (no lightbox).
 */
export default function Gallery({ media }: { media: Media[] }) {
  const images = media.filter((m) => m.type === "image");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (media.length === 0) return null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {media.map((m, i) => (
          <figure
            key={m.src}
            className="group relative overflow-hidden rounded-2xl bg-offwhite shadow-soft break-inside-avoid"
          >
            {m.type === "video" ? (
              <video
                className="h-auto w-full"
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
                className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                aria-label={`Open image: ${m.alt}`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={800}
                  height={Number(600 + ((i * 37) % 220))}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            )}
          </figure>
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}
