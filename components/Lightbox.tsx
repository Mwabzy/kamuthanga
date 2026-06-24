"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { Media } from "@/data/types";

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

  if (index === null || !images[index]) return null;
  const current = images[index];

  return (
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
        className="relative max-h-[88vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1600}
          height={1066}
          sizes="100vw"
          className="mx-auto h-auto max-h-[82vh] w-auto rounded-xl object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-offwhite/70">
          {current.alt}
          {count > 1 && (
            <span className="ml-2 text-offwhite/40">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
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
