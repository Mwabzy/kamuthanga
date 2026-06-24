import type { Property } from "./types";

/**
 * Single source of truth for every property on the Mwabili hub.
 *
 * To add a property:
 *   1. Append a new `Property` object to this array.
 *   2. Drop raw iPhone media in `media-src/<slug>/`, run `npm run convert-media`,
 *      and reference the converted files at `/properties/<slug>/...`.
 * The hub and routes render the new property automatically — no code changes.
 *
 * Prices and media paths below are PLACEHOLDERS — swap them for the real
 * inventory + converted media when ready.
 *
 * TODO(booking): when a deposit/booking engine is added, units/visitOptions
 * will gain a `bookable`/`depositAmount` field that the WhatsApp CTA can defer to.
 */
export const properties: Property[] = [
  {
    slug: "kamuthanga",
    name: "Kamuthanga",
    tagline: "A working fish farm, reimagined as a weekend escape.",
    location: "Machakos, ~75 min from Nairobi",
    status: "live",
    whatsapp: "254700000000", // TODO: replace with the real Mwabili WhatsApp number (E.164, no +)
    hero: {
      type: "image",
      src: "/properties/kamuthanga/hero.webp",
      alt: "Sunlit ponds and green lawns at Kamuthanga fish farm",
    },
    about:
      "Set among spring-fed ponds in the Machakos countryside, Kamuthanga is a working " +
      "tilapia farm that opens its gates for slow weekends. Wake to birdsong, walk the " +
      "water's edge, grill your own catch, and let the day stretch out. Close enough to " +
      "Nairobi for a spontaneous getaway, far enough to feel like somewhere else entirely.",
    highlights: [
      "Spring-fed ponds on a real working fish farm",
      "~75 minutes from Nairobi on a good road",
      "Catch & grill your own tilapia",
      "Family-friendly, pet-friendly grounds",
      "Day visits, overnight stays & private events",
    ],
    gallery: [
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-1.webp",
        alt: "Morning mist over the fish ponds",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-2.webp",
        alt: "Outdoor dining deck overlooking the water",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-3.webp",
        alt: "Guests grilling fresh tilapia by the pond",
      },
      {
        type: "video",
        src: "/properties/kamuthanga/gallery-tour.mp4",
        poster: "/properties/kamuthanga/gallery-tour-poster.jpg",
        alt: "Walking tour of the Kamuthanga grounds",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-4.webp",
        alt: "Cabin interior with warm morning light",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-5.webp",
        alt: "Footpath winding between the ponds at golden hour",
      },
    ],
    units: [
      {
        id: "old-restaurant-rooms",
        name: "Old Restaurant Rooms",
        description:
          "Characterful rooms in the converted old restaurant, each with a handy " +
          "kitchenette for slow mornings and late-night tea.",
        capacity: "Single & double rooms",
        features: ["Kitchenette", "Ensuite", "Garden access", "Free parking"],
        price: { amount: 6500, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/old-restaurant-rooms-1.webp",
            alt: "Double room in the old restaurant with kitchenette",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/old-restaurant-rooms-2.webp",
            alt: "Ensuite bathroom in the old restaurant rooms",
          },
        ],
      },
      {
        id: "family-house",
        name: "Family House",
        description:
          "A relaxed two-bedroom house that comfortably fits two couples or a small " +
          "family, with a shared living space and views over the grounds.",
        capacity: "2 bedrooms · sleeps 4 (two couples)",
        features: ["2 bedrooms", "Full kitchen", "Living room", "Private veranda"],
        price: { amount: 14000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/family-house-1.webp",
            alt: "Family House exterior with veranda",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/family-house-2.webp",
            alt: "Family House living room",
          },
        ],
      },
      {
        id: "cabin",
        name: "Cabin",
        description:
          "A cosy stand-alone cabin tucked close to the water — the quietest, most " +
          "private spot on the farm. Ideal for a couple or a solo reset.",
        capacity: "Max 3 people",
        features: ["Pond views", "Ensuite", "Private deck", "Outdoor seating"],
        price: { amount: 8500, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-1.webp",
            alt: "Cabin exterior beside the pond",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-2.webp",
            alt: "Cabin interior with a double bed and pond view",
          },
        ],
      },
    ],
    visitOptions: [
      {
        id: "day-pass",
        kind: "day",
        name: "Day Pass",
        description:
          "Park, eat, and chill at the farm for the day. Bring the family, walk the " +
          "ponds, and enjoy a long lunch by the water — no overnight stay required.",
        price: { amount: 1000, currency: "KES", per: "person" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/day-pass.webp",
            alt: "Families relaxing on the lawn during a day visit",
          },
        ],
      },
      {
        id: "host-an-event",
        kind: "event",
        name: "Host an event",
        description:
          "Birthdays, baby showers, intimate weddings, team off-sites and church " +
          "retreats. We'll help you shape the day around the water and the grounds. " +
          "Pricing on request based on group size and needs.",
        // price intentionally omitted — events are quoted on request
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/event.webp",
            alt: "Outdoor event set-up with tables by the ponds",
          },
        ],
      },
      {
        id: "catch-and-grill",
        kind: "activity",
        name: "Catch & Grill",
        description:
          "The signature Kamuthanga activity: catch your own tilapia straight from the " +
          "farm ponds, then grill it lakeside with our team. Hands-on, delicious, and " +
          "a hit with kids and adults alike.",
        price: { amount: 1500, currency: "KES", per: "person" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/catch-and-grill.webp",
            alt: "Freshly caught tilapia on the grill",
          },
        ],
      },
    ],
  },

  // A `coming-soon` placeholder so the multi-property hub is visibly demonstrated.
  // Fill in real inventory and flip `status` to "live" when it's ready.
  {
    slug: "naivasha-retreat",
    name: "Naivasha Lakehouse",
    tagline: "A lakeside hideaway in the Rift Valley — coming soon.",
    location: "Naivasha, ~90 min from Nairobi",
    status: "coming-soon",
    whatsapp: "254700000000", // TODO: replace with the real Mwabili WhatsApp number
    hero: {
      type: "image",
      src: "/properties/naivasha-retreat/hero.webp",
      alt: "Acacia-lined lakeshore at golden hour in Naivasha",
    },
    about:
      "Our next escape: a calm lakehouse on the shores of Lake Naivasha, with big skies, " +
      "birdlife, and slow water days. Details and inventory coming soon.",
    highlights: [
      "On the shores of Lake Naivasha",
      "Big-sky sunsets and birdwatching",
      "Boat trips & Crescent Island nearby",
    ],
    gallery: [],
    units: [],
    visitOptions: [],
  },
];

/** Convenience lookup used by the dynamic route. */
export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
