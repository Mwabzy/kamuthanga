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
    whatsapp: "254796410030", // Mwabili enquiry line (E.164, no +)
    hero: {
      type: "image",
      src: "/properties/kamuthanga/hero.webp",
      alt: "Spring-fed pond at golden hour with a timber viewing deck and acacia trees at Kamuthanga",
    },
    about:
      "Set among spring-fed ponds in the Machakos countryside, Kamuthanga is a working " +
      "tilapia farm that opens its gates for slow weekends. Wake to birdsong, walk the " +
      "water's edge, grill your own catch, and let the day stretch out. Close enough to " +
      "Nairobi for a spontaneous getaway, far enough to feel like somewhere else entirely. " +
      "Rooms come self-catering, with an in-house chef and full meal options on request.",
    highlights: [
      "Working fish & pig farm with spring-fed ponds",
      "~75 minutes from Nairobi on a good road",
      "Free swimming, basketball & football for in-house guests",
      "Boat rides, fishing & farm tours on site",
      "Self-catering, or add an in-house chef & full-board meals",
    ],
    gallery: [
      // Centrepiece of the bento — a stay/interior shot framed by the amenity photos.
      {
        type: "image",
        src: "/properties/kamuthanga/family-house-1.webp",
        alt: "Bright Family House living room, one of the stays at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-pool.webp",
        alt: "Outdoor swimming pool with a timber deck, lawns and big-sky clouds at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-garden.webp",
        alt: "Lush green garden lawn framed by banana leaves and shrubs",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-lounge.webp",
        alt: "Shaded outdoor lounge with a glass-topped deck under a canopy",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-party.webp",
        alt: "Timber entertainment area with a DJ booth and dance floor for events",
      },
    ],
    units: [
      {
        id: "old-restaurant-rooms",
        name: "Old Restaurant Rooms",
        description:
          "Characterful rooms in the converted old restaurant, each with a handy " +
          "kitchenette for slow mornings and late-night tea. Single (one person) " +
          "KES 8,000 · Double (two people) KES 12,500. Self-catering, or add meals.",
        capacity: "Single (1 person) & double (2 people) rooms",
        features: ["Kitchenette", "Ensuite", "Self-catering option", "Free parking"],
        // "from" price = single occupancy; double is KES 12,500 (see description).
        price: { amount: 8000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/old-restaurant-rooms-1.webp",
            alt: "Double bedroom with a carved wooden bed and timber-panelled wall in the Old Restaurant Rooms",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/old-restaurant-rooms-2.webp",
            alt: "The carved 'Old Restaurant' sign above the timber-clad building at Kamuthanga",
          },
        ],
      },
      {
        id: "family-house",
        name: "Family House",
        description:
          "A relaxed two-bedroom house with a sitting room, dining room and full " +
          "kitchen — comfortable for up to four adults. Self-catering, or add an " +
          "in-house chef for KES 2,500 per day.",
        capacity: "2 bedrooms · maximum 4 adults",
        features: [
          "2 bedrooms",
          "Sitting & dining room",
          "Full kitchen",
          "Self-catering / chef option",
        ],
        price: { amount: 20000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/family-house-1.webp",
            alt: "Family House living room with a sofa, armchair and garden-view windows",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/family-house-2.webp",
            alt: "Family House covered patio with a wooden dining table for six",
          },
        ],
      },
      {
        id: "cabin",
        name: "Cabin",
        description:
          "A cosy stand-alone cabin with one bedroom, a sitting room, two bathrooms " +
          "and a kitchenette — the quietest, most private spot on the farm. " +
          "Self-catering, or add an in-house chef for KES 2,500 per day.",
        capacity: "1 bedroom · maximum 3 adults",
        features: ["1 bedroom", "2 bathrooms", "Kitchenette", "Sitting room"],
        price: { amount: 15000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-1.webp",
            alt: "The Cabin's timber-clad sitting room with an L-shaped sofa at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-2.webp",
            alt: "Covered veranda with woven armchairs at the Cabin, Kamuthanga",
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
          "Come for the day to park, eat and relax by the water. Swimming, basketball " +
          "and football are free for in-house guests; day-visit pricing is on request.",
        // price intentionally omitted — day-visit rate quoted on request
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/day-pass.webp",
            alt: "Covered timber deck bar with high stools overlooking greenery for day visits at Kamuthanga",
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
      },
      {
        id: "fish-farm-tour",
        kind: "activity",
        name: "Fish Farm Tour",
        description:
          "Go behind the scenes of the working tilapia farm — see the spring-fed " +
          "ponds and how it all runs. A favourite with kids and adults alike.",
        price: { amount: 500, currency: "KES", per: "person" },
      },
      {
        id: "fishing",
        kind: "activity",
        name: "Fishing",
        description:
          "Cast a line and catch your own tilapia straight from the farm ponds.",
        price: { amount: 300, currency: "KES", per: "person" },
      },
      {
        id: "boat-ride",
        kind: "activity",
        name: "Boat Ride",
        description:
          "Glide across the ponds and take in the farm from the water.",
        price: { amount: 100, currency: "KES", per: "person" },
      },
      {
        id: "pig-farm-tour",
        kind: "activity",
        name: "Pig Farm Tour",
        description:
          "Meet the pigs and see the other side of the working farm.",
        price: { amount: 300, currency: "KES", per: "person" },
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
    whatsapp: "254796410030", // Mwabili enquiry line (E.164, no +)
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
