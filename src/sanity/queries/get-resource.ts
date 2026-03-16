import { groq } from 'next-sanity'
import { mediaItem } from './get-media'

export const getResource = groq`
    *[_type == $type && slug.current == $slug][0]{
      _id,
      _type,
      title,
      subtitle,
      pageType,
      path,
      path,
      mediaUrlEmbed,
      "audio": audio.asset->,
      media[]{
        ${mediaItem}
      }
    }
  `
