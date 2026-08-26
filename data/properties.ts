import type { Property } from "./types";

/**
 * LEGACY CONTENT SNAPSHOT - no longer rendered by the site.
 *
 * The hub and property pages now read from Sanity; this array was the source
 * these documents were seeded from. It is kept for two reasons:
 *   1. `scripts/generate-og.mjs` still reads property names out of this file
 *      to build the static OG cards.
 *   2. It is the rollback path if the CMS ever needs to be backed out.
 *
 * Editing it changes nothing on the site. Edit content in the Studio instead:
 * `cd studio && npm run dev`.
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
      // Centrepiece of the bento — the aerial establishing shot framed by amenity photos.
      {
        type: "image",
        src: "/properties/kamuthanga/aerial-view-2.webp",
        alt: "Aerial view of Kamuthanga — the main house, swimming pool and landscaped gardens with a countryside backdrop",
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
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-terrace.webp",
        alt: "Garden terrace with parasol-shaded dining tables beside the main house at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-grounds.webp",
        alt: "The Family House and its wide manicured lawn under big skies at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/cabin-exterior.webp",
        alt: "The timber Cabin set among banana plants and a striped lawn at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/gallery-courtyard.webp",
        alt: "Tiled courtyard in front of a countryside cottage at Kamuthanga",
      },
      {
        type: "image",
        src: "/properties/kamuthanga/oldrestaurant-cover.webp",
        alt: "The Old Restaurant building with its carved sign and timber-clad frontage at Kamuthanga",
      },
    ],
    units: [
      {
        id: "old-restaurant-rooms",
        name: "Old Restaurant Rooms",
        description:
          "Characterful, comfortable rooms in the converted old restaurant. " +
          "Single (one person) KES 6,000 · Double (two people) KES 9,000. " +
          "Self-catering, or add meals.",
        capacity: "Single (1 person) & double (2 people) rooms",
        features: [
          "Ensuite",
          "Self-catering option",
          "Free parking",
          "Pool access included",
        ],
        // "from" price = single occupancy; double is KES 9,000 (see description).
        price: { amount: 6000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-room-1.webp",
            alt: "Double room with a polished wooden bed, white linen and a slatted timber feature wall at the Old Restaurant Rooms",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-room-mirror.webp",
            alt: "Full-length wooden mirror reflecting the bed and pendant light in an Old Restaurant room",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-washroom.webp",
            alt: "Ensuite bathroom with a walk-in glass shower, vessel basin and marble-look tiling at the Old Restaurant Rooms",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-towel.webp",
            alt: "Fresh white towel on a chrome rail beside the shower in an Old Restaurant room",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-aerial.webp",
            alt: "Paved walkway between the Old Restaurant rooms and the covered dining terrace at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-arrival.webp",
            alt: "Guest with a wheeled suitcase letting themselves into their room at the Old Restaurant",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/oldrestaurant-kitchen.webp",
            alt: "Shared kitchen with a marble island and gas cooker at the Old Restaurant Rooms",
          },
        ],
      },
      {
        id: "pool-side-rooms",
        name: "Pool Side Rooms",
        description:
          "Comfortable ensuite rooms right beside the pool, so a swim is only steps " +
          "from your door. Single (one person) KES 9,000 · Double (two people) " +
          "KES 12,500. Self-catering, or add an in-house chef for KES 2,500 per day.",
        capacity: "Single (1 person) & double (2 people) rooms",
        features: [
          "Poolside location",
          "Ensuite",
          "Self-catering option",
          "Pool access included",
          "Free parking",
        ],
        // "from" price = single occupancy; double is KES 12,500 (see description).
        price: { amount: 9000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/poolside-bedroom.webp",
            alt: "Pool Side room with a carved wooden bed, warm walls and a wide curtained window at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/poolside-view.webp",
            alt: "View from inside a Pool Side room through open curtains to the pool and shaded garden table",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/poolside-ensuite.webp",
            alt: "Ensuite bathroom with a glass shower, mirrored cabinet and grey marble tiling in the Pool Side Rooms",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/poolside-pool.webp",
            alt: "The swimming pool with parasols and the Pool Side Rooms building behind it at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/poolside-cabinets.webp",
            alt: "Fitted wardrobe with gloss cabinets in the Pool Side Rooms at Kamuthanga",
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
          "Pool access included",
        ],
        price: { amount: 20000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/familyhouse-cover.webp",
            alt: "Family House exterior with a covered veranda, dining set and lawn at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/familyhouse-bedroom.webp",
            alt: "Family House master bedroom with a carved wooden bed and floral linens at Kamuthanga",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/familyhouse-living.webp",
            alt: "Family House open-plan living and dining area with a breakfast bar",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/familyhouse-dining.webp",
            alt: "Family House dining table for six beside the kitchen",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/familyhouse-kitchen.webp",
            alt: "Family House modern kitchen with a granite island and breakfast bar",
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
        features: [
          "1 bedroom",
          "2 bathrooms",
          "Kitchenette",
          "Sitting room",
          "Pool access included",
        ],
        price: { amount: 15000, currency: "KES", per: "night" },
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-lounge.webp",
            alt: "Cabin living area with an L-shaped sofa and kitchenette in timber-clad walls",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-bedroom.webp",
            alt: "Cabin double bedroom with timber walls and garden-view windows",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-living.webp",
            alt: "Cabin sitting room with a sofa, TV and large curtained windows",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-storage.webp",
            alt: "Cabin bedroom with a wooden wardrobe and ensuite bathroom",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-bathroom.webp",
            alt: "Cabin ensuite with a glass shower and timber-clad walls",
          },
          {
            type: "image",
            src: "/properties/kamuthanga/cabin-exterior.webp",
            alt: "The timber Cabin set in a lush garden with a striped lawn at Kamuthanga",
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
        media: [
          {
            type: "image",
            src: "/properties/kamuthanga/gallery-party.webp",
            alt: "Timber entertainment area with a DJ booth and dance floor set up for an event at Kamuthanga",
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
