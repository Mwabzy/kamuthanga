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
      alt: "Sunlit ponds and green lawns at Kamuthanga fish farm",
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
        id: "fish-farm-tour",
        kind: "activity",
        name: "Fish Farm Tour",
        description:
          "Go behind the scenes of the working tilapia farm — see the spring-fed " +
          "ponds and how it all runs. A favourite with kids and adults alike.",
        price: { amount: 500, currency: "KES", per: "person" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/catch-and-grill.webp",
            alt: "Tilapia ponds on the working fish farm",
          },
        ],
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
