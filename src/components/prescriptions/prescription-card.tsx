'use client'

import { cn } from '@/lib/utils/class-name'
import { formatPrescriptionDate } from '@/lib/utils/date-time'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { Button } from '../ui/button'
import { useTimezone } from '@/lib/hooks/use-timezone'
import { Prescription } from '@/types/semble'

export const PrescriptionCard = ({
  prescription,
}: {
  prescription: Prescription
}) => {
  const tz = useTimezone()

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
        {prescription.name}
      </AnimatedComponent>

      <AnimatedComponent
        as="p"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.2 }}
        className={cn(typePPMori({ size: 'md' }))}
      >
        {tz && formatPrescriptionDate(prescription.dateCreated, tz)}
      </AnimatedComponent>

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.3 }}
      >
        <ConditionalLink
          href={prescription.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Download</Button>
        </ConditionalLink>
      </AnimatedComponent>
    </div>
  )
}
