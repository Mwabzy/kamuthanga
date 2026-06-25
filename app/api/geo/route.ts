import type { NextRequest } from "next/server";

/**
 * Edge endpoint that detects the visitor's country (via Vercel's geolocation
 * header) and returns the matching currency plus today's KES→currency rate.
 *
 * The client calls this once and shows an APPROXIMATE local price beside the
 * real KES price. KES always stays the source of truth — payment is arranged in
 * KES over WhatsApp. If anything is unknown/unavailable we return
 * `{ currency: null }` and the UI simply shows KES only.
 *
 * Notes:
 * - Geolocation only resolves on Vercel (the `x-vercel-ip-country` header).
 *   Locally it's absent, so prices stay KES-only. Append `?country=US` to test.
 * - FX rates come from open.er-api.com (free, no key, supports a KES base) and
 *   are cached for 12h via the Next data cache.
 */
export const runtime = "edge";
export const dynamic = "force-dynamic";

// Minimal country → ISO-4217 currency map (extend as needed).
const COUNTRY_CURRENCY: Record<string, string> = {
  KE: "KES",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  CH: "CHF",
  JP: "JPY",
  CN: "CNY",
  IN: "INR",
  ZA: "ZAR",
  NG: "NGN",
  UG: "UGX",
  TZ: "TZS",
  RW: "RWF",
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  BR: "BRL",
  MX: "MXN",
  // Eurozone
  AT: "EUR",
  BE: "EUR",
  HR: "EUR",
  CY: "EUR",
  EE: "EUR",
  FI: "EUR",
  FR: "EUR",
  DE: "EUR",
  GR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LV: "EUR",
  LT: "EUR",
  LU: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SK: "EUR",
  SI: "EUR",
  ES: "EUR",
};

export async function GET(req: NextRequest) {
  const override = new URL(req.url).searchParams.get("country");
  const country = (
    override ||
    req.headers.get("x-vercel-ip-country") ||
    ""
  ).toUpperCase();

  const currency = COUNTRY_CURRENCY[country];

  // Kenyan visitors (or unknown country) just see KES — no conversion needed.
  if (!currency || currency === "KES") {
    return Response.json({ currency: null });
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/KES", {
      next: { revalidate: 43200 }, // 12h
    });
    const data = (await res.json()) as { rates?: Record<string, number> };
    const rate = data?.rates?.[currency];
    if (!rate) return Response.json({ currency: null });
    return Response.json({ currency, rate });
  } catch {
    return Response.json({ currency: null });
  }
}
