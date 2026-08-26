"use client";

import Image from "next/image";
import type { Media } from "@/data/types";

/**
 * The lightbox figure is capped at `max-w-4xl` (896px), so a full-viewport
 * source is wasted bytes on desktop. Exported because the thumbnails that open
 * the lightbox must warm the exact same variant for it to be a cache hit.
 * next/image still doubles this for high-DPR screens via srcset.
 */
export const LIGHTBOX_SIZES = "(max-width: 896px) 100vw, 896px";

/**
 * Fetches images off-screen so they are already decoded when shown.
 *
 * `loading="eager"` is required: a 1px clipped box never satisfies the
 * lazy-loading intersection check, so lazy copies would never fetch at all.
 * Fixed positioning keeps this out of the document flow no matter where it is
 * mounted.
 */
export default function ImagePreload({ media }: { media: Media[] }) {
  if (media.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
    >
      {media.map((m, i) => (
        <Image
          key={`${m.src}-${i}`}
          src={m.src}
          alt=""
          width={m.width ?? 1600}
          height={m.height ?? 1066}
          sizes={LIGHTBOX_SIZES}
          loading="eager"
        />
      ))}
    </div>
  );
}
