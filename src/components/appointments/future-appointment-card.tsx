'use client'

import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { Button } from '../ui/button'
import { formatBookingDate, formatBookingTime } from '@/lib/utils/date-time'
import { cn } from '@/lib/utils/class-name'
import { Booking } from '@/types/semble'
import { useTimezone } from '@/lib/hooks/use-timezone'

export const FutureAppointmentCard = ({ booking }: { booking: Booking }) => {
  const tz = useTimezone()

  return (
    <div key={booking.id} className="flex flex-col gap-4">
      <AnimatedComponent
        as="h3"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.1 }}
        className={cn(typePPMori({ size: 'lg', weight: 'semibold' }))}
      >
        {booking.appointment.title}
      </AnimatedComponent>

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.2 }}
      >
        <p className={cn('mb-1', typePPMori({ size: '2xl' }))}>
          {tz && formatBookingDate(booking.start, tz)}
        </p>
        <p className={cn(typePPMori({ size: 'lg' }))}>
          {tz && formatBookingTime(booking.start, booking.end, tz)}
        </p>
      </AnimatedComponent>

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.3 }}
      >
        <ConditionalLink
          href={booking.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Join Meeting</Button>
        </ConditionalLink>
      </AnimatedComponent>
    </div>
  )
}
