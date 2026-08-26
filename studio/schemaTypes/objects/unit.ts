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
      name: 'media',
      type: 'array',
      of: [defineArrayMember({ type: 'media' })],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'capacity', media: 'media.0.image' },
  },
})
