import { defineField, defineType } from 'sanity'

/**
 * One row of a unit's group pricing: the nightly rate for a range of guests,
 * e.g. 6–8 guests → KES 25,000 per night.
 */
export const groupRate = defineType({
  name: 'groupRate',
  title: 'Group rate',
  type: 'object',
  fields: [
    defineField({
      name: 'minGuests',
      title: 'From (guests)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'maxGuests',
      title: 'To (guests)',
      description: 'Same as "From" for a single guest count.',
      type: 'number',
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(1)
          .custom((value, context) => {
            const min = (context.parent as { minGuests?: number } | undefined)?.minGuests
            return value === undefined || min === undefined || value >= min
              ? true
              : 'Must be at least "From"'
          }),
    }),
    defineField({
      name: 'amount',
      title: 'Price per night (KES)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: { min: 'minGuests', max: 'maxGuests', amount: 'amount' },
    prepare({ min, max, amount }) {
      const guests = min === max || max === undefined ? `${min}` : `${min}–${max}`
      return {
        title: `${guests} guests`,
        subtitle: typeof amount === 'number' ? `KES ${amount.toLocaleString()} / night` : 'No price',
      }
    },
  },
})
