import groq from 'groq'
export const image = groq`
 'image': {
    _type,
    ...asset->{
      alt,
      _id,
      url,
      originalFilename,
      metadata {
        dimensions {
          aspectRatio,
          height,
          width
        }
      }
    },
    crop,
    hotspot,
    caption,
  }
`

export const video = groq`
 'video': {
    _id,
    ...asset->{
      _id,
      assetId,
      extension,
      originalFilename,
      size,
      uploadId,
      url,
    },
    caption,
    'dimensions': {
      width,
      height,
      aspectRatio,
    },
  }
`

export const mediaItem = groq`
  _type,
  _type == 'image' => {
    ${image},
  },
  _type == 'video' => {
    ${video}
  },
`
