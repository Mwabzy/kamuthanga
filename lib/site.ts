/** Global brand / site configuration. */
export const site = {
  name: "Mwabili",
  tagline: "Weekend escapes near Nairobi.",
  description:
    "Mwabili curates premium weekend escapes near Nairobi — handpicked stays, " +
    "day visits, and private events. Plan your visit over WhatsApp.",
  // Used to build absolute URLs for Open Graph / canonical tags.
  // Override in Vercel with NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mwabili.vercel.app",
} as const;
