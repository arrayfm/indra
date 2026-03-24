import { getPage } from '@/sanity/queries/get-page'
import { getSiteSettings } from '@/sanity/queries/get-site-settings'
import { getMetaData, generateOrganizationData } from '@/lib/core/seo'
import Script from 'next/script'
import { Metadata } from 'next'
import { Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Hero } from '@/components/layout/hero'
import { CardColumns } from '@/components/sections/card-row'
import { FixedImage } from '@/components/partial/fixed-image'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_BOOKINGS } from '@/lib/semble/queries'
import { sortBookingsByDate } from '@/lib/semble/utils'
import { MOCK_FUTURE_APPOINTMENTS } from './patient-dashboard/appointments/page'
import { FutureAppointmentsGrid } from '@/components/appointments/future-appointments-grid'
import { Section } from '@/components/layout/section'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { ArticleCard } from '@/components/article-grid/article-card'
import { AnimatedComponent } from '@/components/layout/animated-component'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'home',
  })
}

export default async function Home() {
  const organizationData = await sanityFetch({
    query: getSiteSettings,
  }).then((data) => generateOrganizationData(data))

  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/' },
  })) as Page

  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(GET_PATIENT_BOOKINGS(profile?.semble_id))

  const { futureAppointments, pastAppointments } = sortBookingsByDate(
    response?.data?.patient?.bookings || []
  )

  const tempFutureAppointments = futureAppointments?.length
    ? futureAppointments
    : MOCK_FUTURE_APPOINTMENTS

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <main className="min-h-screen-header-footer">
        <Hero title={page.title} hasBacklink={false} />
        <CardColumns cards={page.homeContent?.cards} />

        <Section id="future-appointments" className="pt-30">
          <div className="container">
            <div className="grid grid-cols-10 gap-x-2.5 gap-y-10">
              <div className="col-span-10 md:col-span-6">
                <FutureAppointmentsGrid
                  appointments={tempFutureAppointments}
                  title={
                    tempFutureAppointments.length > 0
                      ? 'Upcoming Appointments'
                      : 'No Upcoming Appointments'
                  }
                />
              </div>
            </div>
          </div>
        </Section>

        {page.homeContent?.featuredModule && (
          <Section id="latest-meditation" className="pt-30">
            <div className="container">
              <div className="grid grid-cols-10 gap-x-2.5 gap-y-10">
                <div className="col-span-10 md:col-span-6">
                  <AnimatedComponent
                    as="h2"
                    style={{
                      opacity: 0,
                    }}
                    className={cn(
                      'text-grey-400 col-span-6 mb-2',
                      typePPMori({ size: 'lg' })
                    )}
                  >
                    Latest meditation
                  </AnimatedComponent>
                  <ArticleCard
                    {...page.homeContent?.featuredModule}
                    index={0}
                  />
                </div>
              </div>
            </div>
          </Section>
        )}

        <FixedImage />
      </main>
    </>
  )
}
