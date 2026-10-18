import type { Property, Unit, VisitOption } from "@/data/types";

/**
 * WhatsApp deep-link helpers — the conversion mechanism for the whole site.
 *
 * Every CTA is a `https://wa.me/<number>?text=<prefilled>` link. The prefilled
 * message always names the property and the specific intent, so each tap is both
 * lead qualification AND attribution (we can see exactly which button was used).
 *
 * The brand greets as "Mwabili"; the *property* name is interpolated from data.
 *
 * TODO(analytics): wrap link clicks with an event (e.g. GA4 / Plausible custom
 * event carrying { propertySlug, intent, id }) before navigation.
 */

const BRAND = "Mwabili";

function buildLink(whatsapp: string, text: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Generic "plan a visit" enquiry — used by the persistent primary CTA. */
export function generalEnquiryLink(property: Property): string {
  const text = `Hi ${BRAND} 👋 I'd like to plan a visit to *${property.name}*. Could you help me with options and availability?`;
  return buildLink(property.whatsapp, text);
}

/**
 * Per-unit overnight enquiry, e.g. the Cabin at Kamuthanga. Names the group
 * size when the guest has picked one from the unit's group rates.
 */
export function unitEnquiryLink(
  property: Property,
  unit: Unit,
  guests?: number,
): string {
  const group = guests ? ` for *${guests} guests*` : "";
  const text = `Hi ${BRAND} 👋 I'd like to enquire about staying in the *${unit.name}* at *${property.name}*${group}. Is it available?`;
  return buildLink(property.whatsapp, text);
}

/** Per-visit-option enquiry (day pass / event / activity). */
export function visitOptionEnquiryLink(
  property: Property,
  option: VisitOption,
): string {
  let intent: string;
  switch (option.kind) {
    case "day":
      intent = `plan a day visit (park, eat, chill) at *${property.name}*`;
      break;
    case "event":
      intent = `host an event (*${option.name}*) at *${property.name}*`;
      break;
    case "activity":
      intent = `join the *${option.name}* activity at *${property.name}*`;
      break;
    default:
      intent = `enquire about *${option.name}* at *${property.name}*`;
  }
  const text = `Hi ${BRAND} 👋 I'd like to ${intent}.`;
  return buildLink(property.whatsapp, text);
}
