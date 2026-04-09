import { defineArrayMember, defineField } from 'sanity'
import { RiText } from 'react-icons/ri'
import { MdShortText } from 'react-icons/md'

export const patientDashboardContent = [
  defineField({
    name: 'usefulLinks',
    title: 'Useful Links',
    type: 'object',
    options: {
      collapsible: true,
    },
    fields: [
      defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            name: 'textContent',
            title: 'Text Content',
            icon: RiText,
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
              }),
            ],
            preview: {
              select: {
                title: 'title',
              },
              prepare({ title }) {
                return {
                  title: `${title}`,
                  subtitle: 'Text Content',
                }
              },
            },
          }),
          defineArrayMember({
            type: 'object',
            name: 'links',
            title: 'Links',
            icon: MdShortText,
            fields: [
              defineField({
                name: 'items',
                title: 'Items',
                type: 'array',
                of: [
                  defineArrayMember({
                    type: 'object',
                    name: 'linkItem',
                    title: 'Link Item',
                    fields: [
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
            preview: {
              select: {
                items: 'items',
              },
              prepare({ items }) {
                const itemTitles = items
                  .map((item: any) => item.title)
                  .join(', ')

                return {
                  title: `${itemTitles}`,
                  subtitle: 'Links',
                }
              },
            },
          }),
        ],
      }),
    ],
  }),
]
