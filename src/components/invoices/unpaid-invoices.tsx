import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Invoice } from '@/types/azure'
import { InvoiceItem } from './invoice-item'

export const UnpaidInvoices = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <h2 className={cn('text-grey-400 mb-2', typePPMori({ size: 'lg' }))}>
        Unpaid
      </h2>
      <div>
        {invoices
          .filter((invoice) => invoice.status === 'UNPAID')
          .map((invoice) => (
            <InvoiceItem key={invoice.reference} invoice={invoice} />
          ))}
      </div>
    </div>
  )
}
