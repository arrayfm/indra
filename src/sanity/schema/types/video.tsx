import VideoInput from '@/sanity/components/video-input'
import { GoVideo } from 'react-icons/go'
import { defineType } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'file',
  icon: GoVideo,
  components: { input: VideoInput },
  options: {
    accept: 'video/*',
  },
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'width',
      title: 'Width',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number',
      readOnly: true,
    },
  ],

  preview: {
    select: {
      filename: 'asset.originalFilename',
      caption: 'caption',
      asset: 'asset',
    },
    prepare({ filename, caption, asset }) {
      if (!asset?._ref) {
        return {
          title: caption || filename || 'Video',
          media: GoVideo,
        }
      }

      const fileId = asset._ref.replace('file-', '').replace(/-.+$/, '')
      const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.mp4`

      return {
        title: caption || filename || 'Video',
        media: !url ? (
          GoVideo
        ) : (
          <video
            src={url}
            muted
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ),
      }
    },
  },
})
