import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_PRESCRIPTIONS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '@/components/elements/conditional-link'
import { Button } from '@/components/ui/button'

function formatBookingDate(start: string): string {
  const date = new Date(start).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
  return date
}

function drugsFlatTitle(
  drug: {
    drug?: string
  }[]
) {
  return drug.map((d) => d.drug).join(', ')
}

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(
    GET_PATIENT_PRESCRIPTIONS(profile?.semble_id)
  )

  const prescriptions = response?.data?.patient?.prescriptions.data
    ?.slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      {prescriptions?.map((prescription: any) => (
        <div key={prescription.id} className="col-span-3 flex flex-col gap-2">
          <h3
            className={cn(
              'max-w-2/3 truncate',
              typePPMori({ size: 'md', weight: 'semibold' })
            )}
          >
            {drugsFlatTitle(prescription.drugs)}
          </h3>
          <p className={cn('', typePPMori({ size: 'md' }))}>
            {formatBookingDate(prescription.date)}
          </p>
          <ConditionalLink
            href={prescription.pdfDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Download</Button>
          </ConditionalLink>
        </div>
      ))}
    </div>
  )
}
