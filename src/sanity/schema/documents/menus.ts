import { RiMenuFill } from 'react-icons/ri'
import { defineField, defineType } from 'sanity'
import { createSlugField } from '../fields/slug'

export const menus = defineType({
  name: 'menus',
  title: 'Menus',
  type: 'document',
  icon: RiMenuFill,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    createSlugField({ includeGroup: false }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Navigation items',
      of: [{ type: 'menuItem' }],
    }),
  ],
})
