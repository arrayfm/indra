import { RiText } from 'react-icons/ri'
import { defineType, defineField } from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: RiText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ document }) => document?._type === 'brand',
    }),
    defineField({
      name: 'lead',
      title: 'Lead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContentSimple',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lead: 'lead',
    },
    prepare: ({ title, lead }) => {
      const truncatedLead = lead?.length > 50 ? `${lead.slice(0, 50)}...` : lead

      return {
        title: title || truncatedLead || 'Untitled',
        subtitle: 'Text Block',
      }
    },
  },
})
