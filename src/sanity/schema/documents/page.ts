import { RiPagesLine } from 'react-icons/ri'
import { defineType, defineField, defineArrayMember } from 'sanity'

import { seo } from '@/sanity/schema/fields/seo'
import { createSlugField } from '../fields/slug'

export const page = defineType({
  name: 'page',
  type: 'document',
  icon: RiPagesLine,
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
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      title: 'Parent Page',
      name: 'parent',
      description:
        'This will be used to help build the correct path for the page i.e. /[parent]/this-page',
      type: 'reference',
      group: 'content',
      options: {
        disableNew: true,
      },
      to: [{ type: 'page' }],
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
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 5,
    }),
    defineField({
      name: 'homeContent',
      title: 'Home Page Content',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'link',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    seo,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `${title}`,
      }
    },
  },
})
