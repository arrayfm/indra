import groq from 'groq'
// @sanity-typegen-ignore
export const link = (linkPath = false) => {
  const internalLinkPath = generateInternalLinkPath(6, linkPath)

  return groq`
    "file": ${linkPath ? 'link.file.asset->' : 'file.asset->'},
    "label": ${linkPath ? 'link.label' : 'label'},
    "href": 
    coalesce(
      ${linkPath ? 'link.internalLink->path' : 'internalLink->path'},
      select(
         ${internalLinkPath},
      ),
      ${linkPath ? 'link.externalUrl' : 'externalUrl'}
    )
  `
}

function generateInternalLinkPath(levels: number, linkPath: boolean) {
  const linkRef = linkPath ? 'link.internalLink' : 'internalLink'
  let conditions = []

  for (let i = levels; i >= 1; i--) {
    let path = ''
    path = `defined(${linkRef}${'->parent'.repeat(i)}) => `

    for (let j = i; j >= 1; j--) {
      path += `"/" + ${linkRef}${'->parent'.repeat(j)}->slug.current + `
    }
    path += `"/" + ${linkRef}->slug.current`
    conditions.push(path)
  }

  conditions.push(`"/" + ${linkRef}->slug.current`)

  return conditions.join(',\n')
}

export const linkForTypes = groq`
  "href": coalesce(
    link.internalLink->slug.current,
    link.externalUrl
  )
`
