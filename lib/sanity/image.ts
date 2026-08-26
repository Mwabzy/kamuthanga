import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build a CDN URL for a Sanity image.
 *
 * Every consumer renders through `next/image` with `fill`, so the width here is
 * only an upper bound on what Sanity serves to the optimiser — not the size the
 * browser receives.
 */
export function imageUrl(source: SanityImageSource, width = 1800): string {
  return builder.image(source).width(width).auto("format").quality(80).url();
}
