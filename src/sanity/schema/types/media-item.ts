import { defineType, defineField, defineArrayMember } from 'sanity'
import { ArrayMaxItems } from '@/sanity/components/custom-array'
import { RiImageAddFill } from 'react-icons/ri'
import { ItemPreviewCell } from '@/sanity/components/item-preview-cell'
import { imageExtended } from '../fields/image-extended'

export const mediaItem = defineType({
  name: 'mediaItem',
  type: 'object',
  title: 'Media item',
  fields: [
    defineField({
      name: 'media',
      type: 'array',
      title: 'Media',
      of: [
        defineArrayMember(imageExtended),
        defineArrayMember({ name: 'video', type: 'video' }),
      ],
      components: { input: ArrayMaxItems },
      validation: (Rule) => Rule.max(1),
    }),
  ],
})

export const mediaEmbed = defineType({
  name: 'mediaEmbed',
  type: 'object',
  title: 'Media item',
  icon: RiImageAddFill,
  fields: [
    defineField({
      name: 'media',
      type: 'array',
      title: 'Media',
      of: [
        defineArrayMember(imageExtended),
        defineArrayMember({ name: 'video', type: 'video' }),
      ],
      components: { input: ArrayMaxItems },
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'embed',
      type: 'array',
      title: 'Embed',
      of: [
        defineArrayMember({
          name: 'mediaUrlEmbed',
          type: 'mediaUrlEmbed',
          title: 'Url Embed',
        }),
      ],
      components: { input: ArrayMaxItems },
      validation: (Rule) => Rule.max(1),
    }),
  ],
  preview: {
    select: {
      media: 'media',
    },
    prepare({ media }) {
      return {
        title: '',
        subtitle: '',
        media: media,
      }
    },
  },
  // @ts-expect-error
  components: { preview: ItemPreviewCell },
})
