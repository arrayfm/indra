import groq from 'groq'
// @sanity-typegen-ignore
export const getSitemap = groq`
{
  "sitemap": [
    ...*[_type == 'page'][]{
      _id,
      _type,
      title,
      "path": coalesce(path, select(${generateInternalPath(6)})),
      "lastModified": _updatedAt,
    },
  ]
}
`

export function generateInternalPath(levels: number) {
  let conditions = []

  for (let i = levels; i >= 1; i--) {
    let path = ''
    path = `defined(parent${'->parent'.repeat(i - 1)}) => `

    for (let j = i; j >= 1; j--) {
      path += `"/" + ${'parent->'.repeat(j)}slug.current + `
    }
    path += `"/" + slug.current`
    conditions.push(path)
  }

  conditions.push(`"/" + slug.current`)
  return conditions.join(',\n')
}
