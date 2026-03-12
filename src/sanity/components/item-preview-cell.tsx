import { Badge, Flex, Text, Stack, BadgeProps, Inline, Label } from '@sanity/ui'
import { gridSizes } from '@/sanity/schema/fields/size'
import { urlForImage } from '../lib/image'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { getMediaEmbedUrlThumbnail } from '@/lib/utils/video'
import { checkIfStringIsUrl } from '@/lib/utils/string'

export type ItemPreviewCellProps = {
  subtitle?: string
  title?: string
  media?: {
    image?: {
      _type: 'image'
      asset?: {
        _ref: 'image-ed6b592062c12d02ce2ad2f2e1ce8f01dd609000-1549x2320-jpg'
        _type: 'reference'
      }
      _upload?: {
        progress: number
        createdAt: string
        updatedAt: string
        file: {
          name: string
          type: string
        }
      }
    }
    muxVideo?: {
      _type?: 'mux.video'
      asset: {
        _ref?: 'mux-video-ref'
        _type?: 'reference'
        playbackId?: string
      }
    }
    embedUrl?: {
      _type: 'mediaUrlEmbed'
      url: string
      type: 'youtube' | 'vimeo'
    }
  }[]
  size?: string
}

export const muxPreviewImage = (playbackId = '') => {
  return `https://image.mux.com/${playbackId}/animated.webp`
}

export function ItemPreviewCell({
  subtitle,
  title,
  media,
  size,
}: ItemPreviewCellProps) {
  const { image, muxVideo, embedUrl } = media?.[0] ?? {}
  const gridSize = gridSizes.find((gridSize) => gridSize.value === size)
  const embedThumbnailUrl = getMediaEmbedUrlThumbnail(embedUrl?.url || '')

  return (
    <Flex
      align="center"
      justify="space-between"
      padding={2}
      style={{ cursor: 'pointer' }}
    >
      <Inline space={2}>
        {!image && !muxVideo && !title && (
          <div className="relative flex h-[34px] w-[34px] items-center justify-center overflow-hidden border border-dashed border-black/50 text-black/50">
            <Text size={0}>Empty</Text>
          </div>
        )}
        {image && (
          <div className="relative h-[34px] w-[34px] overflow-hidden">
            {image._upload ? (
              <div className="relative flex h-full w-full items-center justify-center bg-gray-200">
                <Text size={0}>Uploading...</Text>
              </div>
            ) : (
              <Image
                src={urlForImage(image) || ''}
                alt="preview"
                className="object-cover"
                fill
              />
            )}
          </div>
        )}
        {muxVideo && (
          <div className="svg relative flex h-[34px] w-[34px] overflow-hidden border border-black p-2 text-black">
            <FaPlay />
            {muxVideo.asset.playbackId && (
              <Image
                src={muxPreviewImage(muxVideo.asset.playbackId)}
                alt="preview"
                className="object-cover"
                fill
              />
            )}
          </div>
        )}
        {embedUrl && (
          <div className="relative h-[34px] w-[34px] overflow-hidden">
            <Image
              src={
                checkIfStringIsUrl(embedThumbnailUrl) ? embedThumbnailUrl : ''
              }
              alt="thumbnail"
              fill
            />
          </div>
        )}
        {title && (
          <Stack space={2}>
            <Label size={0}>{subtitle}</Label>
            {title && <Text size={2}>{title}</Text>}
          </Stack>
        )}
      </Inline>
      {gridSize && (
        <Badge
          tone={(gridSize?.badgeTone as BadgeProps['tone']) || 'default'}
          padding={2}
          size={2}
          radius={2}
        >
          {gridSize?.title || 'No size selected'}
        </Badge>
      )}
    </Flex>
  )
}
