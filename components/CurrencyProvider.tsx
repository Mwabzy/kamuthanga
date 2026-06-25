"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Conversion = { currency: string; rate: number } | null;

const ConversionContext = createContext<Conversion>(null);

/**
 * Fetches the visitor's currency + KES rate once (from /api/geo) and shares it
 * with price components via context. Cached in sessionStorage so client-side
 * navigation doesn't refetch. Fails silently → KES-only.
 */
export default function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversion, setConversion] = useState<Conversion>(null);

  useEffect(() => {
    const KEY = "mwabili_fx_v1";
    try {
      const cached = sessionStorage.getItem(KEY);
      if (cached) {
        setConversion(JSON.parse(cached) as Conversion);
        return;
      }
    } catch {
      /* ignore */
    }

    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d: { currency?: string | null; rate?: number }) => {
        if (cancelled) return;
        if (d?.currency && d?.rate) {
          const c = { currency: d.currency, rate: d.rate };
          setConversion(c);
          try {
            sessionStorage.setItem(KEY, JSON.stringify(c));
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {
        /* KES-only on failure */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ConversionContext.Provider value={conversion}>
      {children}
    </ConversionContext.Provider>
  );
}

/** True when a local-currency conversion is available for this visitor. */
export function useHasLocalCurrency(): boolean {
  return useContext(ConversionContext) !== null;
}

/**
 * Returns a formatter that converts a KES amount to an approximate local-currency
 * string (e.g. "≈ $70"), or null when no conversion is available.
 */
export function useLocalPrice(): (kes: number) => string | null {
  const conversion = useContext(ConversionContext);

  return useMemo(() => {
    return (kes: number) => {
      if (!conversion) return null;
      const value = kes * conversion.rate;
      const maximumFractionDigits = value < 5 ? 2 : 0;
      try {
        const formatted = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: conversion.currency,
          maximumFractionDigits,
          minimumFractionDigits: 0,
        }).format(value);
        return `≈ ${formatted}`;
      } catch {
        return null;
      }
    };
  }, [conversion]);
}
