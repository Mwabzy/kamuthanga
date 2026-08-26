import { defineField, defineType } from 'sanity'

/** A price. Kept as amount + currency + unit so it can be formatted per locale. */
export const money = defineType({
  name: 'money',
  title: 'Price',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      options: { list: ['KES'] },
      initialValue: 'KES',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'per',
      title: 'Per',
      type: 'string',
      options: {
        list: [
          { title: 'Night', value: 'night' },
          { title: 'Person', value: 'person' },
          { title: 'Day', value: 'day' },
          { title: 'Event', value: 'event' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { amount: 'amount', currency: 'currency', per: 'per' },
    prepare({ amount, currency, per }) {
      return {
        title:
          typeof amount === 'number'
            ? `${currency ?? ''} ${amount.toLocaleString()}`.trim()
            : 'No price',
        subtitle: per ? `per ${per}` : undefined,
      }
    },
  },
})
