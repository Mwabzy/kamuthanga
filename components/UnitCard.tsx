import Image from "next/image";
import type { Property, Unit } from "@/data/types";
import { formatMoney } from "@/lib/format";
import { unitEnquiryLink } from "@/lib/whatsapp";
import WhatsAppButton from "./WhatsAppButton";

/** An overnight room/unit type with photos, capacity, features, price + CTA. */
export default function UnitCard({
  property,
  unit,
}: {
  property: Property;
  unit: Unit;
}) {
  const cover = unit.media[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-taupe/30 bg-offwhite shadow-soft sm:flex-row">
      {cover && (
        <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-2/5">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl">{unit.name}</h3>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-sage/15 px-3 py-1 text-sm font-medium text-forest">
            {formatMoney(unit.price)}
          </span>
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
    </article>
  );
}
