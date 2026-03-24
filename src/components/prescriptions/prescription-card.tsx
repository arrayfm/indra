'use client'

import { cn } from '@/lib/utils/class-name'
import { formatPrescriptionDate } from '@/lib/utils/date-time'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { Button } from '../ui/button'

function drugsFlatTitle(drug: { drug?: string }[]) {
  return drug.map((d) => d.drug).join(', ')
}

export const PrescriptionCard = ({ prescription }: { prescription: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <AnimatedComponent
        as="h3"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.1 }}
        className={cn(
          'max-w-2/3',
          typePPMori({ size: 'md', weight: 'semibold' })
        )}
      >
        {drugsFlatTitle(prescription.drugs)}
      </AnimatedComponent>

      <AnimatedComponent
        as="p"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.2 }}
        className={cn(typePPMori({ size: 'md' }))}
      >
        {formatPrescriptionDate(prescription.date)}
      </AnimatedComponent>

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.3 }}
      >
        <ConditionalLink
          href={prescription.pdfDownloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Download</Button>
        </ConditionalLink>
      </AnimatedComponent>
    </div>
  )
}
