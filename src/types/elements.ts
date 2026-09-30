import { Asset } from 'sanity'
import { ImageProps as NextImageProps } from 'next/image'

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
  cover?: boolean
}

export type Media = { _type: 'image' } & ImageProps

export interface Embed {
  type?: 'vimeo' | 'youtube'
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

export type RowCard = {
  title?: string
  description?: string
  image?: Media
  link?: Link
}

export type LinkItem = {
  title: string
  description?: string
  link: Link
}
