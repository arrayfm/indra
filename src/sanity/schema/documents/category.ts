import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { LuTag } from 'react-icons/lu'
import { defineField, defineType } from 'sanity'
import { createSlugField } from '../fields/slug'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: LuTag,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'category' }),
    defineField({ name: 'title', type: 'string' }),
    createSlugField({ includeGroup: false }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        filter: '!defined(parent)',
        disableNew: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `- ${subtitle}` : ``,
    }),
  },
})
