import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Invoice } from '@/types/azure'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'

export const InvoiceItem = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div key={invoice.reference} className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="">
          <h3 className={cn(typePPMori({ size: 'lg' }))}>
            {invoice.reference}
          </h3>
        </div>
        <div>
          <p className={cn('text-grey-400', typePPMori({ size: 'lg' }))}>
            £{invoice.amount}
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value={invoice.reference}>
          <AccordionTrigger className="flex w-full justify-between">
            <p className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
              {invoice.items.length} item
              {invoice.items.length > 1 ? 's' : ''}
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
          <AccordionContent className="pt-6 pb-2">
            {invoice.items.map((item, index) => (
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ConditionalLink href={invoice.payment_link}>
        <Button>Pay invoice</Button>
      </ConditionalLink>
    </div>
  )
}
