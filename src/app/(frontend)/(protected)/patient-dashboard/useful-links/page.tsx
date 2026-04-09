import { sanityFetch } from '@/sanity/lib/fetch'
import { getPage } from '@/sanity/queries/get-page'
import { Page } from '@/types/documents'
import { TextCard } from '@/components/items/text-card'
import { PatientDashboardContent } from '@/components/patient-dashboard/patient-dashboard-content'

export default async function UsefulLinks() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/patient-dashboard' },
  })) as Page

  console.log(
    'useful links page',
    page.patientDashboardContent?.usefulLinks.content
  )

  return (
    <div className="flex flex-col gap-y-12">
      <PatientDashboardContent
        content={page.patientDashboardContent?.usefulLinks.content || []}
      />
    </div>
  )
}
