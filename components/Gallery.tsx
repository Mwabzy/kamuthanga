"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/data/types";
import Lightbox from "./Lightbox";

/**
 * Property gallery.
 *
 * - With five or more photos it renders a "bento" layout: the first photo is
 *   the centrepiece (a stay/interior shot), framed by four photos in the
 *   corners. Any extra photos flow into a masonry row beneath.
 * - Otherwise it falls back to a simple responsive masonry.
 *
 * All photos open in the shared Lightbox.
 */
export default function Gallery({ media }: { media: Media[] }) {
  const images = media.filter((m) => m.type === "image");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (media.length === 0) return null;

  const open = (m: Media) => setOpenIndex(images.indexOf(m));

  const lightbox = (
    <Lightbox
      images={images}
      index={openIndex}
      onClose={() => setOpenIndex(null)}
      onChange={setOpenIndex}
    />
  );

  // Bento layout: featured centre photo framed by the next four photos.
  if (images.length >= 5) {
    const feature = images[0];
    const corners = images.slice(1, 5);
    const extra = images.slice(5);
    // Desktop placement: photos in the four corners, feature spanning the middle column.
    const cornerPlacement = [
      "sm:col-start-1 sm:row-start-1",
      "sm:col-start-3 sm:row-start-1",
      "sm:col-start-1 sm:row-start-2",
      "sm:col-start-3 sm:row-start-2",
    ];

    return (
      <>
        <div className="grid grid-cols-2 gap-3 sm:h-[460px] sm:grid-cols-3 sm:gap-4 sm:[grid-template-rows:repeat(2,minmax(0,1fr))] md:h-[560px] lg:h-[640px]">
          {/* Centre feature photo */}
          <button
            type="button"
            onClick={() => open(feature)}
            className="group relative col-span-2 aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl bg-offwhite shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 sm:col-span-1 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:aspect-auto sm:h-full"
            aria-label={`Open image: ${feature.alt}`}
          >
            <Image
              src={feature.src}
              alt={feature.alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>

          {/* Corner photos */}
          {corners.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => open(m)}
              className={`group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl bg-offwhite shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 sm:aspect-auto sm:h-full ${cornerPlacement[i]}`}
              aria-label={`Open image: ${m.alt}`}
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>

        {/* Any photos beyond the five-tile bento */}
        {extra.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
            {extra.map((m) => (
              <button
                key={m.src}
                type="button"
                onClick={() => open(m)}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl bg-offwhite shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                aria-label={`Open image: ${m.alt}`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        )}

        {lightbox}
      </>
    );
  }

  // Fallback: responsive masonry of photos (+ any inline videos).
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
                onClick={() => open(m)}
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

      {lightbox}
    </>
  );
}
