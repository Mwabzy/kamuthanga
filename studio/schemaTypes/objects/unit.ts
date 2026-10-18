import { defineArrayMember, defineField, defineType } from 'sanity'

/** An overnight room or house guests can book. */
export const unit = defineType({
  name: 'unit',
  title: 'Unit',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      description: 'Stable slug used in anchors and WhatsApp enquiry links.',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /^[a-z0-9-]+$/.test(value)
            ? true
            : 'Lowercase letters, numbers and hyphens only',
        ),
    }),
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'capacity',
      description: 'Human-readable, e.g. "2 bedrooms · maximum 4 adults".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'price',
      title: 'From price',
      description: 'The lowest rate — single occupancy where rooms differ.',
      type: 'money',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'groupRates',
      title: 'Group rates',
      description:
        'Nightly price by number of guests. Leave empty if the unit has a single price. The site lets guests pick a group size and see their rate.',
      type: 'array',
      of: [defineArrayMember({ type: 'groupRate' })],
      validation: (rule) =>
        rule.custom((rates: Array<{ minGuests?: number; maxGuests?: number }> | undefined) => {
          const sorted = [...(rates ?? [])].sort((a, b) => (a.minGuests ?? 0) - (b.minGuests ?? 0))
          for (let i = 1; i < sorted.length; i++) {
            if ((sorted[i].minGuests ?? 0) <= (sorted[i - 1].maxGuests ?? 0)) {
              return 'Guest ranges overlap'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'ratesNote',
      title: 'Rates note',
      description:
        'Shown under the price, e.g. "Self catering. A chef is available on request." Leave empty if there is nothing to add.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'media',
      type: 'array',
      of: [defineArrayMember({ type: 'media' })],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'capacity', media: 'media.0.image' },
  },
})
