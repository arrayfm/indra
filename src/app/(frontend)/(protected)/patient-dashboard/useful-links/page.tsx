import { sanityFetch } from '@/sanity/lib/fetch'
import { getPage } from '@/sanity/queries/get-page'
import { Page } from '@/types/documents'
import { TextCard } from '@/components/items/text-card'

export default async function UsefulLinks() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/patient-dashboard' },
  })) as Page

  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      {page.patientDashboardContent?.usefulLinks?.items.map((item, index) => (
        <TextCard
          key={index}
          title={item.title}
          description={item.description || ''}
          link={item.link}
        />
      ))}
    </div>
  )
}
