import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_PRESCRIPTIONS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { DateTime } from 'luxon'
import { PrescriptionCard } from '@/components/prescriptions/prescription-card'

export default async function Prescriptions() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(
    GET_PATIENT_PRESCRIPTIONS(profile?.semble_id)
  )

  const allDocs = response?.data?.patient?.patientDocuments?.data ?? []

  const prescriptions = allDocs
    .filter((doc: any) => doc.name?.toLowerCase().includes('pink'))
    .slice()
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(b.dateCreated).toMillis() -
        DateTime.fromISO(a.dateCreated).toMillis()
    )

  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      {prescriptions?.map((prescription: any) => (
        <div key={prescription.id} className="col-span-3 flex flex-col gap-2">
          <PrescriptionCard prescription={prescription} />
        </div>
      ))}
    </div>
  )
}
