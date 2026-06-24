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
 * Lowest nightly/visit price across a property's units and visit options,
 * used for the "from KES X" hint on property cards. Returns null if nothing
 * is priced yet (e.g. coming-soon).
 */
export function fromPrice(property: Property): Money | null {
  const priced: Money[] = [
    ...property.units.map((u) => u.price),
    ...property.visitOptions
      .map((v) => v.price)
      .filter((p): p is Money => Boolean(p)),
  ];
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
