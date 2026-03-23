import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import PatientHistoryTemplate from '@/components/patient-history'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'patient-history',
  })
}

export default async function PatientHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/patient-history' },
  })) as Page

  return (
    <main className="min-h-screen-header">
      <Hero {...page} />
      <PatientHistoryTemplate>{children}</PatientHistoryTemplate>
    </main>
  )
}
