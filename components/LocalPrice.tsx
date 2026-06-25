"use client";

import { useLocalPrice } from "./CurrencyProvider";

/**
 * Renders an approximate local-currency price (e.g. "≈ $70") beside a KES price.
 * Returns nothing when no conversion is available (Kenyan visitors, unknown
 * country, or offline) so KES stands alone.
 */
export default function LocalPrice({
  kes,
  className = "",
  prefix = false,
}: {
  kes: number;
  className?: string;
  /** Prepend a "· " separator for inline use after the KES text. */
  prefix?: boolean;
}) {
  const format = useLocalPrice();
  const local = format(kes);
  if (!local) return null;

  return (
    <span
      className={className}
      title="Approximate, converted from KES at today's rate"
    >
      {prefix ? "· " : ""}
      {local}
    </span>
  );
}
