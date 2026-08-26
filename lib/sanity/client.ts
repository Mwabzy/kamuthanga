import { createClient } from "@sanity/client";

/**
 * Read-only client for the `mwabili` Sanity project.
 *
 * The project ID and dataset are public identifiers (they end up in image URLs
 * anyway), so they are hardcoded as defaults and the site deploys without any
 * environment configuration. Override per-environment if you ever add a staging
 * dataset.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wqwaj8qw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-02-01",
  // The CDN is a few seconds behind at worst, which is fine for property content.
  useCdn: true,
  // Never surface unpublished edits on the public site.
  perspective: "published",
});
