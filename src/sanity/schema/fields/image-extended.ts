import { RiImageLine } from 'react-icons/ri'
import { defineField } from 'sanity'

export const imageExtended = defineField({
  name: 'image',
  type: 'image',
  title: 'Image',
  icon: RiImageLine,
  fields: [
    defineField({
      name: 'altText',
      type: 'string',
      title: 'Alternative text',
      description:
        'Used for alt text & screenreaders; please fill in a descriptive explanation of the image where possible',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption for the image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      altText: 'altText',
      filename: 'asset.originalFilename',
      media: 'asset',
    },
    prepare({ title, altText, filename, media }) {
      return {
        title: title || altText || filename || 'Untitled',
        media,
      }
    },
  },
})
