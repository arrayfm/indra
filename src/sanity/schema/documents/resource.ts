import { MdOutlineDatasetLinked } from 'react-icons/md'
import { defineType, defineField, defineArrayMember } from 'sanity'

import { seo } from '@/sanity/schema/fields/seo'
import { createSlugField } from '../fields/slug'
import { imageExtended } from '../fields/image-extended'
import { ArrayMaxItems } from '@/sanity/components/custom-array'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export const resource = defineType({
  name: 'resource',
  type: 'document',
  title: 'Resource',
  icon: MdOutlineDatasetLinked,
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
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'resource' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
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
      name: 'media',
      title: 'Media',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember(imageExtended),
        defineArrayMember({
          type: 'video',
        }),
      ],
      components: { input: ArrayMaxItems },
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'mediaUrlEmbed',
      title: 'Media URL Embed',
      description: 'Add a video by URL from YouTube or Vimeo',
      type: 'mediaUrlEmbed',
      group: 'content',
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
    }),
    seo,
  ],
  preview: {
    select: {
      title: 'title',
      mediaArray: 'media',
    },
    prepare({ title, mediaArray }) {
      const mediaItem = mediaArray ? mediaArray[0] : MdOutlineDatasetLinked
      return {
        title: `${title}`,
        media: mediaItem,
      }
    },
  },
})
