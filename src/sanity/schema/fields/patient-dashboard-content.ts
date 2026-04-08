import { defineArrayMember, defineField } from 'sanity'

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
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
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
  }),
]
