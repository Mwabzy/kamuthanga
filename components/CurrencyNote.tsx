"use client";

import { useHasLocalCurrency } from "./CurrencyProvider";

/**
 * One-line disclaimer shown only when a local-currency conversion is active,
 * making clear that KES is the real price and locals are approximate.
 */
export default function CurrencyNote({
  className = "",
}: {
  className?: string;
}) {
  if (!useHasLocalCurrency()) return null;
  return (
    <p className={className}>
      Prices are in Kenyan Shillings (KES). Local amounts are approximate,
      converted at today&apos;s exchange rate.
    </p>
  );
}
