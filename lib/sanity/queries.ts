/**
 * GROQ for the property hub.
 *
 * The projections deliberately mirror the shape of `Property` in `data/types.ts`
 * so the mapping in `properties.ts` stays a thin translation rather than a
 * reshaping layer.
 */

/** Shared media projection — an image URL, or a video URL plus poster. */
const MEDIA = `{
  type,
  alt,
  image,
  poster,
  "videoUrl": video.asset->url,
  "dimensions": image.asset->metadata.dimensions{width, height}
}`;

export const PROPERTIES_QUERY = `*[_type == "property" && defined(slug.current)]{
  "slug": slug.current,
  name,
  tagline,
  location,
  status,
  about,
  highlights,
  whatsapp,
  website,
  hero ${MEDIA},
  gallery[] ${MEDIA},
  units[]{
    id,
    name,
    description,
    capacity,
    features,
    price{amount, currency, per},
    media[] ${MEDIA}
  },
  visitOptions[]{
    id,
    kind,
    name,
    description,
    price{amount, currency, per},
    media[] ${MEDIA}
  }
} | order(name asc)`;

export const PROPERTY_SLUGS_QUERY = `*[_type == "property" && defined(slug.current)].slug.current`;
