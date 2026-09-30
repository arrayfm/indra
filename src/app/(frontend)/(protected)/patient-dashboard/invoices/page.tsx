import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { getAzureBillingHistory, getAzureInvoices } from '@/lib/azure/queries'
import { UnpaidInvoices } from '@/components/invoices/unpaid-invoices'
import { PaidInvoices } from '@/components/invoices/paid-invoices'
import { typePPMori } from '@/lib/utils/font'
import type { HistoryItem, Invoice } from '@/types/azure'

const BillingUnavailable = () => (
  <div className="flex flex-col gap-2">
    <h2 className={typePPMori({ size: 'lg' })}>
      Billing information unavailable
    </h2>
    <p className="text-grey-400">
      We couldn&apos;t load your billing information right now. Please try again
      shortly, or contact the team if the problem continues.
    </p>
  </div>
)

export default async function Invoices() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  if (!profile?.email) return <BillingUnavailable />

  let billing: { invoices: Invoice[]; history: HistoryItem[] } | null = null

  try {
    const [invoiceResponse, historyResponse] = await Promise.all([
      getAzureInvoices(profile.email),
      getAzureBillingHistory(profile.email),
    ])

    if (
      invoiceResponse.success === false ||
      historyResponse.success === false ||
      !Array.isArray(invoiceResponse.invoices) ||
      !Array.isArray(historyResponse.history)
    ) {
      billing = null
    } else {
      billing = {
        invoices: invoiceResponse.invoices,
        history: historyResponse.history,
      }
    }
  } catch (error) {
    console.error('Failed to load billing information:', error)
  }

  if (!billing) return <BillingUnavailable />

  return (
    <div className="flex flex-col gap-20">
      <UnpaidInvoices invoices={billing.invoices} />
      <PaidInvoices invoices={billing.history} />
    </div>
  )
}
