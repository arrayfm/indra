'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { DocumentActionComponent, PluginOptions, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { structure } from './src/sanity/structure/desk-structure'

import { openDocumentAction, updatedPublishAction } from '@/sanity/lib/actions'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'
import { media } from 'sanity-plugin-media'

const isDevelopment = process.env.NODE_ENV === 'development'

const dynamicTools = [
  isDevelopment && visionTool({ defaultApiVersion: apiVersion }),
] as PluginOptions[]

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Auto generates pathname using custom paths
  document: {
    actions: (prev) => {
      const actions = prev.map((originalAction: DocumentActionComponent) =>
        originalAction.action === 'publish'
          ? updatedPublishAction(originalAction)
          : originalAction
      )

      return [...actions, openDocumentAction] as DocumentActionComponent[]
    },
  },
  schema: {
    types: schema.types,

    templates: (prev) => {
      const categoryChild = {
        id: 'category-child',
        title: 'Category: Child',
        schemaType: 'category',
        parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],

        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: 'reference', _ref: parentId },
        }),
      }

      return [...prev, categoryChild]
    },
  },
  plugins: [
    structureTool({
      structure,
    }),
    media(),
    ...dynamicTools,
  ],
})
