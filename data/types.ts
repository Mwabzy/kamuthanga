/**
 * Mwabili content types.
 *
 * The whole site is generated from a single typed array of `Property` objects
 * (see ./properties.ts). There is no database or CMS: adding a property means
 * adding one object here and dropping media in `public/properties/<slug>/`.
 */

export type Currency = "KES";

export type PriceUnit = "night" | "person" | "day" | "event";

export type Money = {
  amount: number;
  currency: Currency;
  per: PriceUnit;
};

export type MediaType = "image" | "video";

export type Media = {
  src: string;
  alt: string;
  type: MediaType;
  /** Poster frame for videos (a `.jpg` produced by the convert-media script). */
  poster?: string;
};

/** An overnight room / unit type. */
export type Unit = {
  id: string;
  name: string;
  description: string;
  /** Human-readable capacity, e.g. "Single & double rooms". */
  capacity: string;
  features: string[];
  price: Money;
  media: Media[];
};

export type VisitKind = "day" | "event" | "activity";

/** A non-overnight way to experience the place. */
export type VisitOption = {
  id: string;
  kind: VisitKind;
  name: string;
  description: string;
  /** Optional — events are often "from / on request". */
  price?: Money;
  media?: Media[];
};

export type PropertyStatus = "live" | "coming-soon";

export type Property = {
  slug: string;
  name: string;
  tagline: string;
  /** e.g. "Machakos, ~75 min from Nairobi". */
  location: string;
  status: PropertyStatus;
  /** Full-bleed hero image or video. */
  hero: Media;
  gallery: Media[];
  about: string;
  /** Overnight stays. */
  units: Unit[];
  /** Day / events / activities. */
  visitOptions: VisitOption[];
  /** E.164 without the leading "+", e.g. "2547XXXXXXXX". */
  whatsapp: string;
  /** 3–5 short selling points. */
  highlights: string[];
};
