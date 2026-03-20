import { sanityFetch } from '@/sanity/lib/fetch'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Resource as ResourceProps } from '@/types/documents'
import { Hero } from '@/components/layout/hero'
import { getResource } from '@/sanity/queries/get-resource'
import NotFound from '../../not-found'
import { ResourcePlayer } from '@/components/media/resource-player'
import { Section } from '@/components/layout/section'

type Params = Promise<{ slug: string[] }>

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const { slug } = await params
  return await getMetaData({
    type: 'page',
    slug: slug[slug.length - 1],
  })
}

export default async function Resource({ params }: { params: Params }) {
  const { slug } = await params

  const resource = (await sanityFetch({
    query: getResource,
    params: { type: 'resource', slug: slug[slug.length - 1] },
  })) as ResourceProps

  if (!resource) return NotFound()

  return (
    <main className="min-h-screen-header-footer">
      <Hero {...resource} />
      <Section id="resource-player" className="pt-12">
        <div className="container">
          <ResourcePlayer {...resource} />
        </div>
      </Section>
    </main>
  )
}
