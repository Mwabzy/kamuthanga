"use client";

import { useId } from "react";
import type { GroupRate } from "@/data/types";
import LocalPrice from "./LocalPrice";

const kes = (amount: number) =>
  `KES ${new Intl.NumberFormat("en-KE").format(amount)}`;

const range = (r: GroupRate) =>
  r.minGuests === r.maxGuests ? `${r.minGuests}` : `${r.minGuests}–${r.maxGuests}`;

/** The rate that covers `guests`, if any. */
export function rateFor(rates: GroupRate[], guests: number): GroupRate | undefined {
  return rates.find((r) => guests >= r.minGuests && guests <= r.maxGuests);
}

/**
 * A guest-count stepper that shows the nightly rate for that group, plus the
 * full rate table on request. The selected count is owned by the parent so it
 * can carry through to the WhatsApp enquiry.
 */
export default function GroupRates({
  rates,
  guests,
  onChange,
}: {
  rates: GroupRate[];
  guests: number;
  onChange: (guests: number) => void;
}) {
  const min = rates[0].minGuests;
  const max = rates[rates.length - 1].maxGuests;
  const current = rateFor(rates, guests);
  const labelId = useId();

  return (
    <div className="mt-5 rounded-xl border border-taupe/40 bg-cream p-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-ink" id={labelId}>
            Guests
          </span>
          <div
            className="inline-flex items-center rounded-full border border-taupe/50 bg-offwhite"
            role="group"
            aria-labelledby={labelId}
          >
            <StepButton
              label="Fewer guests"
              disabled={guests <= min}
              onClick={() => onChange(guests - 1)}
            >
              −
            </StepButton>
            <span
              className="min-w-[2.5ch] text-center font-medium tabular-nums text-ink"
              aria-live="polite"
            >
              {guests}
            </span>
            <StepButton
              label="More guests"
              disabled={guests >= max}
              onClick={() => onChange(guests + 1)}
            >
              +
            </StepButton>
          </div>
        </div>

        {current && (
          <div className="text-right">
            <p className="font-medium tabular-nums text-forest">
              {kes(current.amount)}{" "}
              <span className="text-sm font-normal text-muted">/ night</span>
            </p>
            <p className="text-xs tabular-nums text-muted">
              {kes(Math.round(current.amount / guests))} per guest
              <LocalPrice kes={current.amount} prefix className="ml-1" />
            </p>
          </div>
        )}
      </div>

      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-xs font-medium text-brown hover:text-forest [&::-webkit-details-marker]:hidden">
          <span className="inline-block transition-transform group-open:rotate-90">›</span>{" "}
          All group rates
        </summary>
        <table className="mt-2 w-full text-sm">
          <caption className="sr-only">Nightly rate by number of guests</caption>
          <tbody>
            {rates.map((r) => {
              const selected = r === current;
              return (
                <tr
                  key={r.minGuests}
                  className={selected ? "font-medium text-forest" : "text-ink/80"}
                >
                  <th scope="row" className="py-1 text-left font-normal">
                    {range(r)} guests
                  </th>
                  <td className="py-1 text-right tabular-nums">{kes(r.amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </details>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-forest transition-colors hover:bg-sage/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50 disabled:cursor-not-allowed disabled:text-taupe disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
