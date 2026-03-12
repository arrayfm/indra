import { ItemPreviewCell } from '@/sanity/components/item-preview-cell'
import { MediaUrlEmbedInput } from '@/sanity/components/media-url-embed-input'
import { MdVideoSettings } from 'react-icons/md'
import { defineType, defineField, PreviewValue } from 'sanity'

export const mediaUrlEmbed = defineType({
  name: 'mediaUrlEmbed',
  type: 'object',
  title: 'Video',
  icon: MdVideoSettings,
  fields: [
    defineField({
      name: 'url',
      type: 'string',
      title: 'URL',
    }),
    defineField({
      name: 'embedUrl',
      type: 'string',
      title: 'Embed URL',
      hidden: true,
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      hidden: true,
    }),
    defineField({
      name: 'playbackId',
      type: 'string',
      title: 'Playback ID',
      hidden: true,
    }),
  ],
  // @ts-ignore
  components: { input: MediaUrlEmbedInput, preview: ItemPreviewCell },
  preview: {
    select: {
      url: 'url',
      type: 'type',
    },

    // @ts-expect-error I give up for now
    prepare({ url = '', type = '' }) {
      const CapitalizedType = type?.charAt(0).toUpperCase() + type?.slice(1)

      return {
        title: CapitalizedType || 'Video',
        subtitle: `Embed URL`,
        media: url
          ? [
              {
                embedUrl: {
                  url: url as string,
                  type: type as string,
                },
              },
            ]
          : [{}],
      }
    },
  },
})
