import { sanityFetch } from '@/sanity/lib/fetch'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import NotFound from '../../not-found'
import { Article as ArticleProps } from '@/types/documents'
import { getArticle } from '@/sanity/queries/get-article'
import ResourceGrid from '@/components/resource-grid'

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

export default async function Module({ params }: { params: Params }) {
  const { slug } = await params

  const article = (await sanityFetch({
    query: getArticle,
    params: { type: 'article', slug: slug[slug.length - 1] },
  })) as ArticleProps

  if (!article) return NotFound()

  return (
    <main className="min-h-screen-header-footer">
      <ResourceGrid {...article} />
    </main>
  )
}
