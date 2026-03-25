import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_PRESCRIPTIONS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { DateTime } from 'luxon'
import { PrescriptionCard } from '@/components/prescriptions/prescription-card'
import { getAzureBillingHistory, getAzureInvoices } from '@/lib/azure/queries'
import { UnpaidInvoices } from '@/components/invoices/unpaid-invoices'
import { PaidInvoices } from '@/components/invoices/paid-invoices'

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const { success: invoiceSuccess, invoices } = await getAzureInvoices(
    profile?.email ?? ''
  )
  const { success: historySuccess, history } = await getAzureBillingHistory(
    profile?.email ?? ''
  )

  return (
    <div className="flex flex-col gap-20">
      <UnpaidInvoices invoices={invoices} />
      <PaidInvoices invoices={history} />
    </div>
  )
}
