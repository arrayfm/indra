import { getPage } from '@/sanity/queries/get-page'
import { getMetaData, generateOrganizationData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { getArticles } from '@/sanity/queries/get-article'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'modules',
  })
}

export default async function Articles() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/modules' },
  })) as Page

  const articles = await sanityFetch({
    query: getArticles,
  })

  return (
    <>
      <main className="min-h-screen-header-footer"></main>
    </>
  )
}
