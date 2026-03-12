import { defineArrayMember, defineType } from 'sanity'
import { blockLinkFields } from './link'

export const blockContentSimple = defineType({
  name: 'blockContentSimple',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [{ value: 'strong', title: 'Strong' }],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: blockLinkFields,
          },
        ],
      },
      name: 'block',
    }),
  ],
})
