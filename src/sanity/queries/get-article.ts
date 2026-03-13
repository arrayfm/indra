import { groq } from 'next-sanity'
import { mediaItem } from './get-media'

export const getArticle = groq`
    *[_type == $type && slug.current == $slug][0]{
      _id,
      _type,
      pageType,
      path,
      title,
      description,
      _updatedAt,
      "slug": slug.current,
      parent->{
        title,
        path
      },
      media[]{
        ${mediaItem}
      },
      resources {
        layout,
        items[] {
          ...resourceReference->{
            title,
            path,
            mediaUrlEmbed,
            media[]{
              ${mediaItem}
            }
          }
        },
      }
    }
  `

export const getArticles = groq`
  *[_type == 'article'][] | order(orderRank) {
    _id,
    title,
    path,
    "slug": slug.current,
    _updatedAt,
    media[]{
      ${mediaItem}
    },
    resources {
      items[] {
        ...resourceReference->{
          title,
          path,
          media[]{
            ${mediaItem}
          }
        }
      },
    },
  }
`
