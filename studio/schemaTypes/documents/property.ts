import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * A place on the Mwabili hub. One document per property; the hub page and the
 * /[slug] route are both generated from these.
 */
export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'media', title: 'Media' },
    { name: 'inventory', title: 'Inventory' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      description: 'One line, shown under the name on the hub.',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'location',
      description: 'e.g. "Machakos, ~75 min from Nairobi".',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Coming soon', value: 'coming-soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'live',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'about',
      type: 'text',
      rows: 8,
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlights',
      description: '3–5 short selling points.',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'hero',
      description: 'The full-bleed image or video at the top of the page.',
      type: 'media',
      group: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'media' })],
    }),
    defineField({
      name: 'units',
      title: 'Units',
      description: 'Overnight stays.',
      type: 'array',
      group: 'inventory',
      of: [defineArrayMember({ type: 'unit' })],
    }),
    defineField({
      name: 'visitOptions',
      title: 'Visit options',
      description: 'Day passes, events and activities.',
      type: 'array',
      group: 'inventory',
      of: [defineArrayMember({ type: 'visitOption' })],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      description: 'E.164 without the leading +, e.g. 254796410030.',
      type: 'string',
      group: 'contact',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /^[1-9]\d{7,14}$/.test(value)
            ? true
            : 'Digits only, no + or spaces',
        ),
    }),
    defineField({
      name: 'website',
      description: "The property's own site. Leave empty while it is being built.",
      type: 'url',
      group: 'contact',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  orderings: [
    {
      name: 'statusAsc',
      title: 'Status (live first)',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', location: 'location', status: 'status', media: 'hero.image' },
    prepare({ title, location, status, media: hero }) {
      return {
        title,
        subtitle: status === 'coming-soon' ? `${location} · Coming soon` : location,
        media: hero,
      }
    },
  },
})
