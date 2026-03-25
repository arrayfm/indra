import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { HistoryItem, Invoice } from '@/types/azure'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { formatInvoiceDate } from '@/lib/utils/date-time'

interface InvoiceItemProps
  extends
    Pick<Invoice, 'reference' | 'items'>,
    Partial<Pick<Invoice, 'amount' | 'payment_link'>>,
    Pick<HistoryItem, 'reference' | 'items'>,
    Partial<Pick<HistoryItem, 'date_paid' | 'financials'>> {}

export const InvoiceItem = (invoice: InvoiceItemProps) => {
  const { reference, amount, items, payment_link, financials } = invoice
  const datePaid = 'date_paid' in invoice ? invoice.date_paid : undefined

  return (
    <div
      key={reference}
      className="border-grey-400 flex flex-col gap-2 border-b py-6 first:pt-0 last:border-0 last:pb-0"
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className={cn(typePPMori({ size: 'lg' }))}>{reference}</h3>
          {datePaid && (
            <p className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
              {formatInvoiceDate(datePaid)}
            </p>
          )}
        </div>
        <div>
          <p className={cn('text-grey-400', typePPMori({ size: 'lg' }))}>
            £{amount || financials?.total_paid.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value={reference}>
          <AccordionTrigger className="flex w-full justify-between">
            <p className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
              {items?.length ?? 0} item{items?.length > 1 ? 's' : ''}
            </p>
            <p
              className={cn(
                'text-grey-400',
                typePPMori({ size: 'md', weight: 'semibold' })
              )}
            >
              Expand {'+'}
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 pt-6 pb-2">
            {items?.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-x-2.5">
                <p className={cn('col-span-4', typePPMori({ size: 'md' }))}>
                  {item.description}
                </p>
                <p
                  className={cn(
                    'text-grey-400 col-span-1 text-right',
                    typePPMori({ size: 'md' })
                  )}
                >
                  x{item.qty}
                </p>
                <p
                  className={cn(
                    'text-grey-400 col-span-1 text-right',
                    typePPMori({ size: 'md' })
                  )}
                >
                  £{item.line_total.toFixed(2)}
                </p>
              </div>
            ))}
            {financials?.delivery_fee && (
              <div className="grid grid-cols-6 gap-x-2.5">
                <p className={cn('col-span-4', typePPMori({ size: 'md' }))}>
                  Delivery fee
                </p>
                <p
                  className={cn(
                    'text-grey-400 col-span-2 text-right',
                    typePPMori({ size: 'md' })
                  )}
                >
                  £{financials?.delivery_fee.toFixed(2)}
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {payment_link && (
        <ConditionalLink href={payment_link}>
          <Button>Pay invoice</Button>
        </ConditionalLink>
      )}
    </div>
  )
}
