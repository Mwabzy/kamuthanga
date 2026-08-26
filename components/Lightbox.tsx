"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Media } from "@/data/types";
import ImagePreload, { LIGHTBOX_SIZES } from "./ImagePreload";

type LightboxProps = {
  /** Image-only media to page through. */
  images: Media[];
  /** Currently shown index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/**
 * Shared full-screen image viewer used by both the property Gallery and the
 * UnitCard photo viewer. Esc / arrow keys / tap-outside to close, with
 * prev/next when there's more than one image.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: LightboxProps) {
  const count = images.length;

  // Portal target only exists in the browser; guard for SSR/first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % count);
  }, [index, count, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + count) % count);
  }, [index, count, onChange]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, next, prev]);

  // Touch swipe (mobile): horizontal drag pages between photos.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    // Only treat as a swipe when it's clearly horizontal.
    if (count > 1 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  if (index === null || !images[index] || !mounted) return null;
  const current = images[index];

  // A swipe should paint an image the browser already holds rather than
  // starting a download, so keep the neighbours warm. De-duplicated because
  // prev and next are the same photo when there are only two.
  const neighbours: Media[] =
    count > 1
      ? [(index + 1) % count, (index - 1 + count) % count]
          .filter((i, pos, all) => i !== index && all.indexOf(i) === pos)
          .map((i) => images[i])
      : [];

  // Render to <body> so the fixed overlay can't be trapped by an ancestor's
  // containing block (e.g. the Reveal wrapper's `will-change: transform`) or
  // clipped by a card's `overflow-hidden`. This is what was hiding the stays
  // photo viewer on mobile.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-offwhite/10 p-2 text-offwhite hover:bg-offwhite/20"
        aria-label="Close"
      >
        <Icon kind="close" />
      </button>

      {count > 1 && (
        <>
          <NavButton side="left" onClick={prev} />
          <NavButton side="right" onClick={next} />
        </>
      )}

      <figure
        className="relative max-h-[88vh] w-full max-w-4xl select-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width ?? 1600}
          height={current.height ?? 1066}
          sizes={LIGHTBOX_SIZES}
          draggable={false}
          className="pointer-events-none mx-auto h-auto max-h-[78vh] w-auto rounded-xl object-contain"
        />

        {/* Keeps a swipe on cache instead of the network. */}
        <ImagePreload media={neighbours} />

        {count > 1 && (
          <>
            {/* Tappable dots — easy to see and use on mobile */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(i);
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-offwhite"
                      : "w-2.5 bg-offwhite/40 hover:bg-offwhite/70"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-offwhite/40 sm:hidden">
              Swipe or tap the dots to browse
            </p>
          </>
        )}

        <figcaption className="mt-2 text-center text-sm text-offwhite/70">
          {current.alt}
          {count > 1 && (
            <span className="ml-2 text-offwhite/40">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body,
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
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink/55 p-3 text-offwhite ring-1 ring-offwhite/20 backdrop-blur-sm transition-colors hover:bg-ink/75 ${
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3"
      }`}
      aria-label={side === "left" ? "Previous image" : "Next image"}
    >
      <Icon kind={side} />
    </button>
  );
}

function Icon({ kind }: { kind: "close" | "left" | "right" }) {
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
      {kind === "close" && (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      )}
      {kind === "left" && <polyline points="15 18 9 12 15 6" />}
      {kind === "right" && <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}
