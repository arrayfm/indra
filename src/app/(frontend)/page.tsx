import { getPage } from '@/sanity/queries/get-page'
import { getSiteSettings } from '@/sanity/queries/get-site-settings'
import { getMetaData, generateOrganizationData } from '@/lib/core/seo'
import Script from 'next/script'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SmoothScroll } from '@/components/layout/smooth-scroll'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'home',
  })
}

export default async function Home() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/' },
  })) as Page

  const organizationData = await sanityFetch({
    query: getSiteSettings,
  }).then((data) => generateOrganizationData(data))

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <SmoothScroll>
        <main className="min-h-screen-header-footer"></main>
      </SmoothScroll>
    </>
  )
}
