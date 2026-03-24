import { groq } from 'next-sanity'

import { mediaItem } from './get-media'
import { link } from './get-link'

export const getPage = groq`
    *[_type == $type && path == $path][0]{
      _id,
      _type,
      pageType,
      path,
      title,
      _updatedAt,
      "slug": slug.current,
      parent->{
        title,
        path
      },
      description,
      homeContent {
        cards[] {
          title,  
          description,
          image {
            ${mediaItem}
          },
          link {
            ${link()}
          }
        },
        featuredModule-> {
          _id,
          title,
          path,
          "slug": slug.current,
          _updatedAt,
          media[]{
            ${mediaItem}
          },
        }
      }
    }
  `
