import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/types";
import { fromPrice, formatAmount, offerTag } from "@/lib/format";
import LocalPrice from "./LocalPrice";

/**
 * Hub card for a single property. Live cards link to `/<slug>`; `coming-soon`
 * cards render dimmed with a badge and no link.
 */
export default function PropertyCard({ property }: { property: Property }) {
  const comingSoon = property.status === "coming-soon";
  const price = fromPrice(property);
  const tag = offerTag(property);

  const inner = (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-taupe/30 bg-offwhite shadow-soft transition-all duration-300 ${
        comingSoon ? "opacity-75" : "hover:-translate-y-1 hover:shadow-lift"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.hero.src}
          alt={property.hero.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ${
            comingSoon ? "" : "group-hover:scale-105"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
        />
        {comingSoon ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-offwhite backdrop-blur">
            Coming soon
          </span>
        ) : (
          tag && (
            <span className="absolute left-4 top-4 rounded-full bg-offwhite/90 px-3 py-1 text-xs font-medium text-forest backdrop-blur">
              {tag}
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{property.location}</p>
        <h3 className="mt-2 text-2xl">{property.name}</h3>
        <p className="mt-2 text-pretty text-sm text-muted">
          {property.tagline}
        </p>

        <div className="mt-5 flex-1" />
        <div className="flex items-center justify-between">
          {price ? (
            <p className="text-sm text-ink">
              <span className="text-muted">from </span>
              <span className="font-semibold">{formatAmount(price)}</span>
              <LocalPrice
                kes={price.amount}
                prefix
                className="ml-1 text-muted"
              />
            </p>
          ) : (
            <span className="text-sm text-muted">Opening soon</span>
          )}
          {!comingSoon && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-forest">
              Explore
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (comingSoon) {
    return <div aria-disabled="true">{inner}</div>;
  }

  return (
    <Link
      href={`/${property.slug}`}
      className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      {inner}
    </Link>
  );
}
