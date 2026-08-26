import { cache } from "react";
import type {
  Media,
  Money,
  Property,
  PropertyStatus,
  Unit,
  VisitKind,
  VisitOption,
} from "@/data/types";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { imageUrl } from "./image";
import { PROPERTIES_QUERY, PROPERTY_SLUGS_QUERY } from "./queries";

/** The raw shape the GROQ projections return, before mapping. */
type RawMedia = {
  type?: "image" | "video";
  alt?: string;
  image?: SanityImageSource;
  poster?: SanityImageSource;
  videoUrl?: string;
};

type RawProperty = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: PropertyStatus;
  about: string;
  highlights?: string[];
  whatsapp: string;
  website?: string;
  hero?: RawMedia;
  gallery?: RawMedia[];
  units?: {
    id: string;
    name: string;
    description: string;
    capacity: string;
    features?: string[];
    price: Money;
    media?: RawMedia[];
  }[];
  visitOptions?: {
    id: string;
    kind: VisitKind;
    name: string;
    description: string;
    price?: Money;
    media?: RawMedia[];
  }[];
};

/**
 * Turn a Sanity media object into the `Media` shape the components already
 * consume, so nothing downstream needs to know Sanity exists.
 *
 * Returns null for entries with no usable asset — a half-filled media item in
 * the Studio should drop out of the gallery, not render a broken image.
 */
function toMedia(raw: RawMedia | undefined, width?: number): Media | null {
  if (!raw) return null;
  const alt = raw.alt ?? "";

  if (raw.type === "video") {
    if (!raw.videoUrl) return null;
    return {
      type: "video",
      src: raw.videoUrl,
      alt,
      poster: raw.poster ? imageUrl(raw.poster, 1600) : undefined,
    };
  }

  if (!raw.image) return null;
  return { type: "image", src: imageUrl(raw.image, width), alt };
}

function toMediaList(raw: RawMedia[] | undefined, width?: number): Media[] {
  return (raw ?? [])
    .map((m) => toMedia(m, width))
    .filter((m): m is Media => m !== null);
}

function toProperty(raw: RawProperty): Property | null {
  // The hero is the one piece of media the page cannot render without.
  const hero = toMedia(raw.hero, 2000);
  if (!hero) return null;

  const units: Unit[] = (raw.units ?? []).map((u) => ({
    id: u.id,
    name: u.name,
    description: u.description,
    capacity: u.capacity,
    features: u.features ?? [],
    price: u.price,
    media: toMediaList(u.media, 1400),
  }));

  const visitOptions: VisitOption[] = (raw.visitOptions ?? []).map((v) => ({
    id: v.id,
    kind: v.kind,
    name: v.name,
    description: v.description,
    price: v.price ?? undefined,
    media: toMediaList(v.media, 1400),
  }));

  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    location: raw.location,
    status: raw.status,
    about: raw.about,
    highlights: raw.highlights ?? [],
    whatsapp: raw.whatsapp,
    website: raw.website ?? undefined,
    hero,
    gallery: toMediaList(raw.gallery, 1600),
    units,
    visitOptions,
  };
}

/**
 * Every property, ready to render. Replaces the old `properties` array.
 *
 * Wrapped in `cache` so a page that needs the data in both `generateMetadata`
 * and its render only hits the API once per request.
 */
export const getProperties = cache(async (): Promise<Property[]> => {
  const raw = await sanityClient.fetch<RawProperty[]>(PROPERTIES_QUERY);
  return raw.map(toProperty).filter((p): p is Property => p !== null);
});

/** Single property by slug. Replaces the old `getProperty` lookup. */
export async function getProperty(slug: string): Promise<Property | undefined> {
  const all = await getProperties();
  return all.find((p) => p.slug === slug);
}

/** Slugs only — used by `generateStaticParams`, so it skips the full payload. */
export async function getPropertySlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(PROPERTY_SLUGS_QUERY);
}
