import { Asset } from 'sanity'
import { ImageProps as NextImageProps } from 'next/image'

export interface MuxVideo {
  _id: string
  playbackId: string
  url: string
  ratio: string
}

export type Video = Pick<
  Asset,
  | '_id'
  | 'assetId'
  | 'url'
  | 'originalFilename'
  | 'extension'
  | 'size'
  | 'uploadId'
> & {
  caption?: string
  dimensions: {
    aspectRatio: number
    height: number
    width: number
  }
}

export type Image = Pick<Asset, '_id' | 'url' | 'alt' | 'caption'> & {
  alt?: string
  caption?: string
  metadata: {
    dimensions: {
      aspectRatio: number
      height: number
      width: number
    }
  }
  crop?: { top: number; bottom: number; left: number; right: number } | null
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface ImageProps extends Omit<
  NextImageProps,
  'fill' | 'src' | 'alt' | 'width' | 'height'
> {
  image?: Image

  alt?: string
  src?: string
  aspectRatio?: string
  transition?: boolean
  rounded?: boolean
  imageWidth?: number
  sanityImageOptions?: {
    format?: 'webp' | 'png' | 'jpg'
    width?: number
    quality?: number
    fit?: 'crop' | 'clip' | 'fill' | 'max' | 'scale'
  }
}

export type VideoOutputSize = {
  width?: number
  height?: number
  ratio?: number
  poster?: boolean
}

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  video?: Video
  aspectRatio?: string
  rounded?: boolean
  transition?: boolean
  onLoadedData?: () => void
  cover?: boolean
  outputSize?: VideoOutputSize
}

export type Media =
  | ({ _type: 'image' } & ImageProps)
  | ({ _type: 'video' } & VideoProps)

export interface Embed {
  type?: 'mux' | 'vimeo' | 'youtube'
  muxVideo?: MuxVideo
  url?: string
  embedUrl?: string
  playbackId?: string
  autoplay?: boolean
  controls?: boolean
  hasMedia?: boolean
}

export type Link = {
  href?: string
  label?: string
  file?: Asset
  blank?: boolean
}

export type Audio = {
  uploadId?: string
  assetId?: string
  url?: string
  extension?: string
  path?: string
}
