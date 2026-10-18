/**
 * Uploads the Ravenswood photos in public/properties/ravenswood/<unit folder>
 * to their units, each with alt text, and builds the property gallery from a
 * curated selection of them.
 *
 * Writes to the draft, so nothing changes on the live site until the document
 * is published in the Studio. Safe to re-run: photos already on a unit (matched
 * by legacySrc or original filename) are skipped, missing units are created,
 * the gallery is only filled when it is empty, and group rates are always reset
 * to the Ravenswood catalogue (public/properties/ravenswood/catalogue.jpeg).
 * Capacity, the headline price and the rates note are only filled when missing,
 * so edits made in the Studio stay.
 *
 *   npx sanity exec scripts/seed-ravenswood.ts --with-user-token
 */
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-02-01' })

const PROPERTY_ID = '5e1a54e1-7f81-487f-b1e0-8607d520ffe0'
const PUBLIC_ROOT = '/properties/ravenswood'
const LOCAL_ROOT = path.resolve(__dirname, '../../public', `.${PUBLIC_ROOT}`)

type Photo = [file: string, alt: string]
type Rate = { minGuests: number; maxGuests: number; amount: number }
type UnitSeed = {
  id: string
  folder: string
  /** Fields for a unit that does not exist yet. */
  create?: { name: string; description: string }
  capacity: string
  /** Nightly rate by group size, from the catalogue. */
  rates: Rate[]
  photos: Photo[]
}

/** The catalogue prices every unit the same way, up to its capacity. */
const catalogueRates = (maxGuests: number): Rate[] => [
  { minGuests: 2, maxGuests: 2, amount: 15000 },
  { minGuests: 3, maxGuests: 3, amount: 18000 },
  { minGuests: 4, maxGuests: 4, amount: 20000 },
  { minGuests: 5, maxGuests: 5, amount: 22500 },
  { minGuests: 6, maxGuests, amount: 25000 },
]

/** Catering terms from the catalogue, the same for every unit. */
const RATES_NOTE =
  'Rates are on a self-catering basis, but a chef is available on request at KES 3,000–5,000, depending on the number of guests and the menu.'

/** Photos in display order. Ones already on a unit keep their place at the front. */
const units: UnitSeed[] = [
  {
    id: 'cabinalpha',
    folder: 'cabin alpha',
    capacity: '2 bedrooms · up to 6 guests',
    rates: catalogueRates(6),
    photos: [
      ['Cover Photo.jpeg', 'Four e-bikes with yellow helmets parked on the lawn in front of the A-frame cabin and its white-railed deck'],
      ['WhatsApp Image 2026-10-18 at 10.06.05.jpeg', 'The A-frame cabin with a steep dark roof, timber gable and wraparound deck, set on a green lawn under a blue sky'],
      ['WhatsApp Image 2026-10-18 at 10.06.06.jpeg', 'The A-frame cabin glowing with warm lights at dusk under a deep blue sky'],
      ['WhatsApp Image 2026-10-18 at 10.06.15.jpeg', 'Side view of the A-frame cabin across a wide lawn, framed by hedges and trees'],
      ['WhatsApp Image 2026-10-18 at 10.06.04.jpeg', 'Double-height living room with timber-clad ceiling, rattan pendant lights, a brick fireplace and an open kitchen beneath the loft stairs'],
      ['WhatsApp Image 2026-10-18 at 10.06.02.jpeg', 'Rust-coloured corner sofa on a cream rug under a sloping timber ceiling with a skylight'],
      ['WhatsApp Image 2026-10-18 at 10.06.12.jpeg', 'Sofa and armchair beside glass doors that open onto the deck and views of the tea country'],
      ['WhatsApp Image 2026-10-18 at 10.06.08.jpeg', 'Brick fireplace with a stone surround and wall-mounted TV beside a timber staircase'],
      ['WhatsApp Image 2026-10-18 at 10.06.09.jpeg', 'Sunlit dining table with four wooden chairs under the sloping timber roof'],
      ['WhatsApp Image 2026-10-18 at 10.06.13.jpeg', 'Live-edge wooden dining table with a vase of greenery beneath a skylight'],
      ['WhatsApp Image 2026-10-18 at 10.06.03.jpeg', 'Close-up of a glass vase of greenery and colourful woven placemats on the dining table'],
      ['WhatsApp Image 2026-10-18 at 10.06.11.jpeg', 'Open timber staircase rising to the loft, with a rattan pendant light'],
      ['WhatsApp Image 2026-10-18 at 10.06.17.jpeg', 'Loft bedroom under the A-frame roof with a double bed, a triangular lattice window and a floor mirror'],
      ['WhatsApp Image 2026-10-18 at 10.06.18.jpeg', 'Double bed with white linen beneath dark timber rafters and a roof window in the loft'],
      ['WhatsApp Image 2026-10-18 at 10.06.19.jpeg', 'View along the loft walkway to a bedroom at the far end of the A-frame'],
      ['WhatsApp Image 2026-10-18 at 10.06.07.jpeg', 'Narrow A-frame bedroom with a double bed facing a triangular window, lit by roof windows on both sides'],
      ['WhatsApp Image 2026-10-18 at 10.06.16.jpeg', 'Bedroom with a carved four-post double bed, brass wall lights and a roof window'],
      ['WhatsApp Image 2026-10-18 at 10.06.14.jpeg', 'Freestanding bathtub surrounded by potted plants at the foot of a bed, with doors opening to the deck'],
      ['WhatsApp Image 2026-10-18 at 10.06.10.jpeg', 'Close-up of the freestanding bathtub among leafy plants beside an arched floor mirror'],
    ],
  },
  {
    id: 'villaafricana',
    folder: 'villa africana',
    capacity: '3 bedrooms · up to 8 guests',
    rates: catalogueRates(8),
    photos: [
      ['WhatsApp Image 2026-10-18 at 10.04.52 (3).jpeg', 'Villa Africana, a two-storey stone villa with a terracotta tiled roof, on a wide green lawn under a bright blue sky in Tigoni'],
      ['WhatsApp Image 2026-10-18 at 10.04.52 (1).jpeg', 'Villa Africana with its white-railed balcony, seen past a hedge and a bush of purple flowers'],
      ['WhatsApp Image 2026-10-18 at 10.04.51 (1).jpeg', 'Open-plan living room with burnt-orange velvet sofas, a brick fireplace, a wall-mounted TV and tall windows with navy curtains'],
      ['WhatsApp Image 2026-10-18 at 10.04.52.jpeg', 'Living area with orange sofas and houndstooth cushions facing a brick fireplace, with the kitchen breakfast bar behind'],
      ['WhatsApp Image 2026-10-18 at 10.04.51 (2).jpeg', 'Close-up of an orange velvet sofa with houndstooth cushions beside a panelled wooden door'],
      ['WhatsApp Image 2026-10-18 at 10.04.53 (2).jpeg', 'Fitted white kitchen with a gas hob, oven and microwave, and a timber breakfast bar with bench seating'],
      ['WhatsApp Image 2026-10-18 at 10.04.55.jpeg', 'Attic bedroom with exposed timber roof beams, a double bed with orange cushions and throw, and a Persian rug'],
      ['WhatsApp Image 2026-10-18 at 10.04.54 (3).jpeg', 'Attic bedroom with sloping timber beams and orange-striped cushions, seen through the leaves of a houseplant'],
      ['WhatsApp Image 2026-10-18 at 10.04.55 (1).jpeg', 'Bedroom with a double bed, a potted plant and an open door to an en-suite bathroom'],
      ['WhatsApp Image 2026-10-18 at 10.04.53 (1).jpeg', 'Double bed with floral cushions and a brown throw, next to an open door to the en-suite bathroom'],
      ['WhatsApp Image 2026-10-18 at 10.04.51 (3).jpeg', 'Double bed with a black iron frame, white linen and watercolour floral cushions'],
      ['WhatsApp Image 2026-10-18 at 10.04.54 (1).jpeg', 'Bright bedroom with two double beds, monstera-print cushions, grey throws and rattan pendant lights'],
      ['WhatsApp Image 2026-10-18 at 10.04.50.jpeg', 'Two beds with black iron frames and leaf-print cushions beside a large window with sheer curtains'],
      ['WhatsApp Image 2026-10-18 at 10.04.54.jpeg', 'Double bedroom with a black iron bed, leaf-print cushions, a rattan pendant light and a window onto the garden'],
      ['WhatsApp Image 2026-10-18 at 10.04.53 (3).jpeg', 'Guest washroom with a white basin, black and gold tap and geometric stone-effect wall tiles'],
      ['WhatsApp Image 2026-10-18 at 10.04.54 (2).jpeg', 'Covered balcony with a wooden table and six folding chairs, looking out over the garden'],
    ],
  },
  {
    id: 'villataboga',
    folder: 'villa taboga',
    capacity: '3 bedrooms · up to 8 guests',
    rates: catalogueRates(8),
    create: {
      name: 'Villa Taboga',
      description:
        'A stone cottage with a terracotta tiled roof and a garden lawn, with a green velvet lounge, a breakfast bar and a balcony looking out over the Tigoni hills.',
    },
    photos: [
      ['WhatsApp Image 2026-10-18 at 10.05.49.jpeg', 'Villa Taboga, a stone cottage with a terracotta tiled roof and tall chimney, behind a red-leafed hedge and green lawn'],
      ['WhatsApp Image 2026-10-18 at 10.05.43.jpeg', 'Villa Taboga at dusk with warm light glowing from its windows'],
      ['WhatsApp Image 2026-10-18 at 10.05.41.jpeg', 'Villa Taboga in late-afternoon sun, seen across the lawn with a hedge and trees beside it'],
      ['WhatsApp Image 2026-10-18 at 10.05.47.jpeg', 'Front of Villa Taboga with its white-railed balcony, with Villa Africana and a flowering tree in the background'],
      ['WhatsApp Image 2026-10-18 at 10.05.36.jpeg', 'Hanging egg chair on a balcony overlooking rolling green farmland and the Tigoni hills'],
      ['WhatsApp Image 2026-10-18 at 10.05.39.jpeg', 'Living room with an emerald-green velvet corner sofa, a gold wire coffee table and tall windows with navy curtains'],
      ['WhatsApp Image 2026-10-18 at 10.05.42.jpeg', 'Green velvet sofas by a large window, with a panelled double wooden door and a rattan pendant light'],
      ['WhatsApp Image 2026-10-18 at 10.05.40.jpeg', 'Green velvet sofa and gold wire coffee table on a patterned rug beside a garden window'],
      ['WhatsApp Image 2026-10-18 at 10.05.44.jpeg', 'Green sofa with patterned cushions under a woven pendant light, with a view of the garden through the window'],
      ['WhatsApp Image 2026-10-18 at 10.05.46.jpeg', 'Timber breakfast bar with woven black bar stools beside a window onto the flowering garden'],
      ['WhatsApp Image 2026-10-18 at 10.05.37.jpeg', 'Bedroom with a dark wooden double bed, cream cushions and a large window onto the trees'],
      ['WhatsApp Image 2026-10-18 at 10.05.50.jpeg', 'Double bed with black geometric cushions beneath a window looking out over green countryside'],
      ['WhatsApp Image 2026-10-18 at 10.05.45.jpeg', 'Bedroom with a black iron bed, orange patterned cushions, tasselled throw, orange curtains and a wicker trunk'],
      ['WhatsApp Image 2026-10-18 at 10.05.48.jpeg', 'Black iron bed with orange and white patterned cushions, framed by orange curtains and a brass wall light'],
      ['WhatsApp Image 2026-10-18 at 10.05.38.jpeg', 'Double bed with white linen and dark cushions beside an open black metal clothes rail'],
    ],
  },
]

/** A spread across all three units: exteriors, living spaces, bedrooms and views. */
const gallery: Array<[folder: string, file: string]> = [
  ['cabin alpha', 'Cover Photo.jpeg'],
  ['villa africana', 'WhatsApp Image 2026-10-18 at 10.04.52 (3).jpeg'],
  ['villa taboga', 'WhatsApp Image 2026-10-18 at 10.05.36.jpeg'],
  ['cabin alpha', 'WhatsApp Image 2026-10-18 at 10.06.06.jpeg'],
  ['cabin alpha', 'WhatsApp Image 2026-10-18 at 10.06.04.jpeg'],
  ['villa taboga', 'WhatsApp Image 2026-10-18 at 10.05.39.jpeg'],
  ['villa africana', 'WhatsApp Image 2026-10-18 at 10.04.51 (1).jpeg'],
  ['cabin alpha', 'WhatsApp Image 2026-10-18 at 10.06.17.jpeg'],
  ['villa taboga', 'WhatsApp Image 2026-10-18 at 10.05.43.jpeg'],
  ['cabin alpha', 'WhatsApp Image 2026-10-18 at 10.06.14.jpeg'],
  ['villa africana', 'WhatsApp Image 2026-10-18 at 10.04.55.jpeg'],
  ['villa taboga', 'WhatsApp Image 2026-10-18 at 10.05.48.jpeg'],
  ['cabin alpha', 'WhatsApp Image 2026-10-18 at 10.06.12.jpeg'],
  ['villa taboga', 'WhatsApp Image 2026-10-18 at 10.05.47.jpeg'],
]

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

type Media = {
  _key: string
  _type?: string
  type: string
  image?: { _type: 'image'; asset: { _type: 'reference'; _ref: string } }
  alt?: string
  legacySrc?: string
}

async function main() {
  const base =
    (await client.getDocument(`drafts.${PROPERTY_ID}`)) ?? (await client.getDocument(PROPERTY_ID))
  if (!base) throw new Error(`Property ${PROPERTY_ID} not found`)
  base.units ??= []

  // Original filenames of every asset already on the document, by asset id.
  const assetIds: string[] = JSON.stringify(base).match(/image-[a-f0-9]+-\d+x\d+-\w+/g) ?? []
  const names = new Map(
    (
      await client.fetch<Array<{ _id: string; originalFilename?: string }>>(
        `*[_id in $ids]{_id, originalFilename}`,
        { ids: [...new Set(assetIds)] },
      )
    ).map((a) => [a._id, a.originalFilename]),
  )

  /** legacySrc → media item, for building the gallery from the same assets. */
  const bySrc = new Map<string, Media>()

  for (const seed of units) {
    let unit = base.units.find((u: { id?: string }) => u.id === seed.id)
    if (!unit) {
      if (!seed.create) throw new Error(`Unit "${seed.id}" not found`)
      unit = { _key: key(), _type: 'unit', id: seed.id, ...seed.create, media: [] }
      base.units.push(unit)
      console.log(`create  unit ${seed.id}`)
    }
    unit.media = ((unit.media ?? []) as Media[]).map((m) => ({ ...m, alt: m.alt?.trim() }))
    unit.capacity ??= seed.capacity
    unit.price ??= { _type: 'money', amount: seed.rates[0].amount, currency: 'KES', per: 'night' }
    unit.ratesNote ??= RATES_NOTE
    unit.groupRates = seed.rates.map((r) => ({ _key: key(), _type: 'groupRate', ...r }))

    const have = new Set<string>()
    for (const m of unit.media as Media[]) {
      if (m.legacySrc) have.add(m.legacySrc)
      const name = m.image && names.get(m.image.asset._ref)
      if (name) have.add(`${PUBLIC_ROOT}/${seed.folder}/${name}`)
    }

    for (const [file, alt] of seed.photos) {
      const legacySrc = `${PUBLIC_ROOT}/${seed.folder}/${file}`
      const existing = (unit.media as Media[]).find(
        (m) => m.legacySrc === legacySrc || (m.image && names.get(m.image.asset._ref) === file),
      )
      if (existing) {
        bySrc.set(legacySrc, existing)
        continue
      }
      const asset = await client.assets.upload(
        'image',
        createReadStream(path.join(LOCAL_ROOT, seed.folder, file)),
        { filename: file },
      )
      const item: Media = {
        _key: key(),
        _type: 'media',
        type: 'image',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt,
        legacySrc,
      }
      unit.media.push(item)
      bySrc.set(legacySrc, item)
      console.log(`upload  ${seed.folder}/${file}`)
    }
  }

  if (!base.gallery?.length) {
    base.gallery = gallery.map(([folder, file]) => {
      const src = bySrc.get(`${PUBLIC_ROOT}/${folder}/${file}`)
      if (!src) throw new Error(`Gallery photo ${folder}/${file} is not on any unit`)
      return { ...src, _key: key() }
    })
    console.log(`gallery ${base.gallery.length} photos`)
  } else {
    console.log('gallery already has photos, left as is')
  }

  const { _rev, _updatedAt, _createdAt, ...doc } = base
  await client.createOrReplace({ ...doc, _id: `drafts.${PROPERTY_ID}` })
  console.log('\nSaved to the Ravenswood draft. Publish it in the Studio to go live.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
