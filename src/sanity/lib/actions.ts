import groq from 'groq'
import { RiExternalLinkLine } from 'react-icons/ri'
import {
  DocumentActionComponent,
  DocumentActionProps,
  useDocumentOperation,
} from 'sanity'
import { sanityFetch } from './fetch'
import { generateInternalPath } from '../queries/get-sitemap'
import { getPathname } from './pathname'

const getPagePath = groq`
    *[_type == 'page' && slug.current == $slug][0]{
      "path": select(${generateInternalPath(6)})
    }
    `

const hasPath = ['page', 'article', 'resource']

export const updatedPublishAction = (
  originalPublishAction: DocumentActionComponent
) => {
  const BetterAction = (props: DocumentActionProps) => {
    const { patch, publish } = useDocumentOperation(props.id, props.type)

    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        if (!hasPath.includes(props.type)) {
          if (originalResult && originalResult.onHandle) {
            originalResult.onHandle()
          }

          return
        }

        const { draft = {}, published = {} } = props as unknown as any

        const currentSlug =
          draft?.slug?.current || published?.slug?.current || ''

        let parentSlugsPath = currentSlug
        const hasParent = draft?.parent || published?.parent

        if (props.type === 'page' && hasParent && parentSlugsPath) {
          const pathFetch = await sanityFetch({
            query: getPagePath,
            params: { slug: currentSlug },
          })

          parentSlugsPath = pathFetch?.path || parentSlugsPath
        } else if (props.type === 'page' && !hasParent) {
          parentSlugsPath = `/${currentSlug}`
        }

        const updatedPathname = await getPathname(props.type, parentSlugsPath)

        if (draft?.path !== updatedPathname) {
          patch.execute([{ set: { path: updatedPathname } }])
          publish.execute()
        }

        if (originalResult && originalResult.onHandle) {
          originalResult.onHandle()
        }
      },
    }
  }
  return BetterAction
}

export const openDocumentAction = (props: DocumentActionProps) => {
  if (!hasPath.includes(props.type)) return null

  return {
    label: 'Open',
    icon: RiExternalLinkLine,
    onHandle: async () => {
      const { published } = props as unknown as any

      const currentPath = published?.path || ''
      if (typeof currentPath !== 'string') return

      window.open(currentPath, '_blank')
    },
  }
}
