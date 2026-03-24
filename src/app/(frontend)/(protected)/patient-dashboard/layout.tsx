import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import PatientDashboardTemplate from '@/components/patient-dashboard'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'patient-dashboard',
  })
}

export default async function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/patient-dashboard' },
  })) as Page

  return (
    <main className="min-h-screen-header">
      <Hero {...page} />
      <PatientDashboardTemplate>{children}</PatientDashboardTemplate>
    </main>
  )
}
