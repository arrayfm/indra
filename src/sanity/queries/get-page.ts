import { groq } from 'next-sanity'
import { getContent } from './get-content'
import { mediaItem } from './get-media'

export const getPage = groq`
    *[_type == $type && path == $path][0]{
      _id,
      _type,
      pageType,
      path,
      title,
      _updatedAt,
      "slug": slug.current,
      summaryMedia {
        ${mediaItem}
      },
      parent->{
        title,
        path
      },
      ${getContent}
    }
  `
