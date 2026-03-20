import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import { FixedImage } from '@/components/partial/fixed-image'
import { Section } from '@/components/layout/section'
import { SetPasswordForm } from '@/components/form/set-password'
import { redirect } from 'next/navigation'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'set-password',
  })
}

export default async function SetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  if (!token) redirect('/login')

  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/set-password' },
  })) as Page

  return (
    <main className="min-h-screen-header-footer">
      <Hero title="Set password" hasBacklink={false} />
      <Section id="set-password" className="pt-18 sm:pt-32 md:pt-36">
        <div className="container">
          <div className="sm:w-3/4 md:max-w-1/2">
            <SetPasswordForm token={token} />
          </div>
        </div>
      </Section>
      <FixedImage />
    </main>
  )
}
