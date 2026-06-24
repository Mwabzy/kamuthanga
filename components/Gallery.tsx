"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Media } from "@/data/types";

/**
 * Responsive masonry-ish gallery of photos + video.
 * - Images open in a lightbox (Esc / arrows / tap-outside to close).
 * - Videos show a poster and play inline on tap (no lightbox).
 */
export default function Gallery({ media }: { media: Media[] }) {
  const images = media.filter((m) => m.type === "image");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Map a media item to its index within the images-only array for the lightbox.
  const imageIndexOf = (m: Media) => images.indexOf(m);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

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
                onClick={() => setOpenIndex(imageIndexOf(m))}
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

      {/* Lightbox */}
      {openIndex !== null && images[openIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-offwhite/10 p-2 text-offwhite hover:bg-offwhite/20"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {images.length > 1 && (
            <>
              <NavButton side="left" onClick={prev} />
              <NavButton side="right" onClick={next} />
            </>
          )}

          <figure
            className="relative max-h-[88vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              width={1600}
              height={1066}
              sizes="100vw"
              className="mx-auto h-auto max-h-[82vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-offwhite/70">
              {images[openIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-offwhite/10 p-3 text-offwhite hover:bg-offwhite/20 ${
        side === "left" ? "left-3" : "right-3"
      }`}
      aria-label={side === "left" ? "Previous image" : "Next image"}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {side === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
