import { groq } from 'next-sanity'
import { mediaItem } from './get-media'

export const getResource = groq`
    *[_type == $type && path == $path][0]{
      _id,
      _type,
      pageType,
      path,
      title,
      path,
      mediaUrlEmbed,
      media[]{
        ${mediaItem}
      }
  `
