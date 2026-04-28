import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import ShopGrid from '@/components/shop-grid'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_COLLECTION_PRODUCTS } from '@/lib/shopify/queries'
import { ShopifyCollectionProducts } from '@/types/shopify'
import { mapShopifyProducts } from '@/lib/shopify/utils'

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

  const shopifyData = (await shopifyFetch({
    query: GET_COLLECTION_PRODUCTS,
    variables: { handle: 'portal' },
  })) as ShopifyCollectionProducts

  const products = mapShopifyProducts(shopifyData, { limit: 50 })

  return (
    <main className="min-h-screen-header-footer">
      <Hero title={page.title} />
      <ShopGrid products={products} />
    </main>
  )
}
