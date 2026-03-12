import { sanityFetch } from '@/sanity/lib/fetch'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Summary } from '@/components/sections/summary'
import { getPage } from '@/sanity/queries/get-page'
import NotFound from '../not-found'
import { ContentBuilder } from '@/components/layout/content-builder'
import { Page as PageProps } from '@/types/documents'
import { SmoothScroll } from '@/components/layout/smooth-scroll'

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

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const path = slug.join('/')

  console.log('slug', slug)

  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path },
  })) as PageProps

  if (!page) return NotFound()

  return (
    <SmoothScroll>
      <main className="min-h-screen-header-footer">
        <Summary {...page} />
        <ContentBuilder content={page.content} />
      </main>
    </SmoothScroll>
  )
}
