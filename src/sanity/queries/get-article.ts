import { groq } from 'next-sanity'
import { mediaItem } from './get-media'

export const getArticle = groq`
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
      resources[] {
        resourceReference->{
          title,
          path,
          mediaUrlEmbed,
          media[]{
            ${mediaItem}
          }
        }
      },
    }
  `

export const getArticles = groq`
  *[_type == 'article'][]{
    _id,
    title,
    path,
    "slug": slug.current,
    _updatedAt,
    resources[] {
      resourceReference->{
        title,
        path,
        media[]{
          ${mediaItem}
        }
      }
    },
  }
`
