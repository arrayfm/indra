import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import ShopGrid from '@/components/shop-grid'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'shop',
  })
}

export default async function Shop() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/shop' },
  })) as Page

  return (
    <main className="min-h-screen-header-footer">
      <Hero title={page.title} />
      <ShopGrid />
    </main>
  )
}
