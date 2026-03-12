import createImageUrlBuilder from '@sanity/image-url'
import { defineField, type Image } from 'sanity'

import { dataset, projectId } from '@/sanity/env'

import { SanityImageSource } from '@sanity/asset-utils'

export const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  if (!source || source._upload) {
    return ''
  }
  return imageBuilder?.image(source).auto('format').fit('max').url()
}

export const sharedImageFields = () => {
  return [
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
      description: 'A short description of the image',
    }),
  ]
}

export const parseSanityImageAssetToUrl = ({
  source,
  options,
}: {
  source?: SanityImageSource
  options?: {
    format?: 'webp' | 'png' | 'jpg'
    width?: number
    quality?: number
    fit?: 'crop' | 'clip' | 'fill' | 'max' | 'scale'
  }
}) => {
  if (!source) return null

  const {
    format = 'webp',
    width = 1920,
    quality = 80,
    fit = 'crop',
  } = options || {}

  return (
    imageBuilder
      ?.image(source)
      .format(format)
      .width(width)
      .quality(quality)
      .fit(fit)
      .url() || ''
  )
}