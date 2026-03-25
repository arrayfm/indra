import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Invoice } from '@/types/azure'
import { InvoiceItem } from './invoice-item'
import { AnimatedComponent } from '../layout/animated-component'

export const UnpaidInvoices = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <AnimatedComponent
        as="h2"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.1 }}
        className={cn('text-grey-400 mb-2', typePPMori({ size: 'lg' }))}
      >
        Unpaid
      </AnimatedComponent>
      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.25 }}
      >
        {invoices
          .filter((invoice) => invoice.status === 'UNPAID')
          .map((invoice) => (
            <InvoiceItem key={invoice.reference} {...invoice} />
          ))}
      </AnimatedComponent>
    </div>
  )
}
