import groq from 'groq'

export const getSeo = groq`
      *[_type == $type && slug.current == $slug][0]{
        _id,
        _type,
        "slug": slug.current,
        "modifiedDate": _updatedAt,
        "publishDate": coalesce(publishDate, _createdAt),
        "title": coalesce(seo.seoTitle, title),
        "description": coalesce(seo.seoDescription, hero.lead, introduction),
        "image": coalesce(seo.seoImage.asset->{
          alt,
          url,
          "height": metadata.dimensions.height,
          "width":metadata.dimensions.width
        },
          hero.media[0].asset->{
            alt,
            url,
            "height": metadata.dimensions.height,
            "width": metadata.dimensions.width
          },
          media[0].asset->{
            alt,
            url,
            "height": metadata.dimensions.height,
            "width": metadata.dimensions.width
          }
        ),
        "socialTitle": coalesce(seo.seoTitle, title),
        "socialDescription": coalesce(seo.socialDescription, seo.seoDescription, hero.lead, introduction),
      }
    `
