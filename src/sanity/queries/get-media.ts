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

export const mediaItem = groq`
  _type,
  _type == 'image' => {
    ${image},
  },
`
