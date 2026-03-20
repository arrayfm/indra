import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import { FixedImage } from '@/components/partial/fixed-image'
import { Section } from '@/components/layout/section'
import { RegisterForm } from '@/components/form/register'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'register',
  })
}

export default async function Register() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/register' },
  })) as Page

  return (
    <main className="min-h-screen-header-footer">
      <Hero title="Register" hasBacklink={false} />
      <Section id="register" className="pt-18 sm:pt-32 md:pt-36">
        <div className="container">
          <div className="sm:w-3/4 md:max-w-1/2">
            <RegisterForm />
          </div>
        </div>
      </Section>
      <FixedImage />
    </main>
  )
}
