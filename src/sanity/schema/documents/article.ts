import { RiNewspaperLine } from 'react-icons/ri'
import { defineType, defineField, defineArrayMember } from 'sanity'

import { seo } from '@/sanity/schema/fields/seo'
import { createSlugField } from '../fields/slug'
import { imageExtended } from '../fields/image-extended'

export const article = defineType({
  name: 'article',
  type: 'document',
  title: 'Module',
  icon: RiNewspaperLine,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),

    createSlugField(),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      group: 'content',
      hidden: true,
    }),
    defineField({
      title: 'Publish Date',
      name: 'publishDate',
      type: 'date',
      group: 'content',
      description: 'If left empty, the date will default to the created date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      group: 'content',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'resource',
          title: 'Resource',
          fields: [
            defineField({
              name: 'resourceReference',
              title: 'Resource Reference',
              type: 'reference',
              to: [{ type: 'resource' }],
            }),
          ],
          preview: {
            select: {
              title: 'resourceReference.title',
              media: 'resourceReference.media.0',
            },
          },
        }),
      ],
    }),
    seo,
  ],
  preview: {
    select: {
      title: 'title',
      mediaArray: 'media',
    },
    prepare({ title, mediaArray }) {
      const mediaItem = mediaArray ? mediaArray[0] : RiNewspaperLine
      return {
        title: `${title}`,
        media: mediaItem,
      }
    },
  },
})
