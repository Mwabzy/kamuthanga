"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media, Property, Unit } from "@/data/types";
import { formatMoney } from "@/lib/format";
import { unitEnquiryLink } from "@/lib/whatsapp";
import WhatsAppButton from "./WhatsAppButton";
import ImagePreload from "./ImagePreload";
import Lightbox from "./Lightbox";
import LocalPrice from "./LocalPrice";

/**
 * An overnight room/unit type with photos, capacity, features, price + CTA.
 * Selecting the photo opens a lightbox that pages through all of the unit's
 * images (Old Restaurant Rooms, Family House and Cabin each have two).
 */
export default function UnitCard({
  property,
  unit,
}: {
  property: Property;
  unit: Unit;
}) {
  const images = unit.media.filter((m) => m.type === "image");
  const cover = images[0];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The cover thumbnail is a smaller variant than the lightbox needs, so warm
  // the full-size version as soon as someone reaches for it.
  const [warm, setWarm] = useState<Media[]>([]);
  const warmUp = () => setWarm(cover ? [cover] : []);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-taupe/30 bg-offwhite shadow-soft sm:flex-row">
      {cover && (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          onPointerEnter={warmUp}
          onTouchStart={warmUp}
          onFocus={warmUp}
          className="group relative aspect-[4/3] w-full shrink-0 cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest/50 sm:aspect-auto sm:w-2/5"
          aria-label={`View ${images.length} photos of the ${unit.name}`}
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {images.length > 1 && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/65 px-3 py-1 text-xs font-medium text-offwhite backdrop-blur-sm">
              <PhotoIcon />
              {images.length} photos
            </span>
          )}
        </button>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl">{unit.name}</h3>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="whitespace-nowrap rounded-full bg-sage/15 px-3 py-1 text-sm font-medium text-forest">
              {formatMoney(unit.price)}
            </span>
            <LocalPrice kes={unit.price.amount} className="text-xs text-muted" />
          </div>
        </div>

        <p className="mt-1 text-sm font-medium text-brown">{unit.capacity}</p>
        <p className="mt-3 text-pretty text-muted">{unit.description}</p>

        {unit.features.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {unit.features.map((f) => (
              <li
                key={f}
                className="rounded-full border border-taupe/40 px-3 py-1 text-xs text-ink/80"
              >
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex-1" />
        <WhatsAppButton
          href={unitEnquiryLink(property, unit)}
          variant="outline"
          className="self-start"
          ariaLabel={`Enquire about staying in the ${unit.name} at ${property.name}`}
        >
          Enquire about {unit.name}
        </WhatsAppButton>
      </div>

      <ImagePreload media={warm} />

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </article>
  );
}

function PhotoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
