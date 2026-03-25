import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_PRESCRIPTIONS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { DateTime } from 'luxon'
import { PrescriptionCard } from '@/components/prescriptions/prescription-card'
import { getAzureInvoices } from '@/lib/azure/queries'
import { UnpaidInvoices } from '@/components/invoices/unpaid-invoices'

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const { success, invoices } = await getAzureInvoices(profile?.email ?? '')

  return (
    <div className="flex flex-col gap-20">
      <UnpaidInvoices invoices={invoices} />
    </div>
  )
}
