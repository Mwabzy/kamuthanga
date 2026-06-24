import type { Money, Property } from "@/data/types";

const PER_LABEL: Record<Money["per"], string> = {
  night: "night",
  person: "person",
  day: "day",
  event: "event",
};

/** "KES 6,500 / night" */
export function formatMoney(money: Money): string {
  const amount = new Intl.NumberFormat("en-KE").format(money.amount);
  return `${money.currency} ${amount} / ${PER_LABEL[money.per]}`;
}

/** "KES 6,500" — amount only, no per-unit suffix. */
export function formatAmount(money: Money): string {
  const amount = new Intl.NumberFormat("en-KE").format(money.amount);
  return `${money.currency} ${amount}`;
}

/**
 * Lowest price used for the "from KES X" hint on property cards.
 *
 * Prefers overnight stays (the headline product) when the property has any, so
 * the hint reads as a nightly rate rather than the cheapest add-on activity.
 * Falls back to visit options for day/event-only properties. Returns null if
 * nothing is priced yet (e.g. coming-soon).
 */
export function fromPrice(property: Property): Money | null {
  const stayPrices: Money[] = property.units.map((u) => u.price);
  const visitPrices: Money[] = property.visitOptions
    .map((v) => v.price)
    .filter((p): p is Money => Boolean(p));

  const priced = stayPrices.length > 0 ? stayPrices : visitPrices;
  if (priced.length === 0) return null;
  return priced.reduce((min, p) => (p.amount < min.amount ? p : min));
}

/**
 * Short tag string for a property card, e.g. "Stay · Day · Events · Activities".
 * Derived from what the property actually offers.
 */
export function offerTag(property: Property): string {
  const parts: string[] = [];
  if (property.units.length > 0) parts.push("Stay");
  const kinds = new Set(property.visitOptions.map((v) => v.kind));
  if (kinds.has("day")) parts.push("Day");
  if (kinds.has("event")) parts.push("Events");
  if (kinds.has("activity")) parts.push("Activities");
  return parts.join(" · ");
}
