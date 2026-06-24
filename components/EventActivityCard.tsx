import Image from "next/image";
import type { Property, VisitOption } from "@/data/types";
import { formatMoney } from "@/lib/format";
import { visitOptionEnquiryLink } from "@/lib/whatsapp";
import WhatsAppButton from "./WhatsAppButton";

const CTA_LABEL: Record<VisitOption["kind"], string> = {
  day: "Plan a day visit",
  event: "Enquire to host",
  activity: "Join this activity",
};

/**
 * Card for a visit option (day pass / host an event / join an activity), each
 * with its own contextual WhatsApp CTA. Handles the "on request" case when an
 * option has no fixed price.
 */
export default function EventActivityCard({
  property,
  option,
}: {
  property: Property;
  option: VisitOption;
}) {
  const cover = option.media?.[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-taupe/30 bg-offwhite shadow-soft">
      {cover && (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl">{option.name}</h3>
        <p className="mt-1 text-sm font-medium text-brown">
          {option.price ? formatMoney(option.price) : "Pricing on request"}
        </p>
        <p className="mt-3 text-pretty text-sm text-muted">
          {option.description}
        </p>

        <div className="mt-6 flex-1" />
        <WhatsAppButton
          href={visitOptionEnquiryLink(property, option)}
          variant="outline"
          className="self-start"
          ariaLabel={`${CTA_LABEL[option.kind]}: ${option.name} at ${property.name}`}
        >
          {CTA_LABEL[option.kind]}
        </WhatsAppButton>
      </div>
    </article>
  );
}
