import { getPage } from '@/sanity/queries/get-page'
import { getSiteSettings } from '@/sanity/queries/get-site-settings'
import { getMetaData, generateOrganizationData } from '@/lib/core/seo'
import Script from 'next/script'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import { FixedImage } from '@/components/partial/fixed-image'
import { LoginForm } from '@/components/form/login'
import { Section } from '@/components/layout/section'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'login',
  })
}

export default async function Login() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/login' },
  })) as Page

  return (
    <main className="min-h-screen-header-footer">
      <Hero title="Welcome" hasBacklink={false} />
      <Section id="login" className="pt-18 sm:pt-32 md:pt-36">
        <div className="container">
          <div className="sm:w-3/4 md:max-w-1/2">
            <LoginForm />
          </div>
        </div>
      </Section>
      <FixedImage />
    </main>
  )
}
