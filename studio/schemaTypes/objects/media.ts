import { defineField, defineType } from 'sanity'

/**
 * One image or video, with the alt text the site renders.
 *
 * `legacySrc` records the /public path each asset was seeded from, so anything
 * in the dataset can be traced back to the file it came from.
 */
export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'video',
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'poster',
      title: 'Poster frame',
      description: 'Still shown before the video plays.',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: 'Describe the photo for screen readers and search engines.',
      type: 'string',
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'legacySrc',
      title: 'Legacy source path',
      description: 'The /public path this asset was seeded from.',
      type: 'string',
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'image', type: 'type' },
    prepare({ title, media: image, type }) {
      return { title: title || 'Untitled media', subtitle: type, media: image }
    },
  },
})
