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
      type: 'string',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'textBlock' })],
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
