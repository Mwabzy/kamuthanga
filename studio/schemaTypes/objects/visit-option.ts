import { defineArrayMember, defineField, defineType } from 'sanity'

/** A non-overnight way to experience the place: day pass, event or activity. */
export const visitOption = defineType({
  name: 'visitOption',
  title: 'Visit option',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /^[a-z0-9-]+$/.test(value)
            ? true
            : 'Lowercase letters, numbers and hyphens only',
        ),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          { title: 'Day visit', value: 'day' },
          { title: 'Event', value: 'event' },
          { title: 'Activity', value: 'activity' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      description: 'Leave empty to show "on request".',
      type: 'money',
    }),
    defineField({
      name: 'media',
      type: 'array',
      of: [defineArrayMember({ type: 'media' })],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'kind', media: 'media.0.image' },
  },
})
