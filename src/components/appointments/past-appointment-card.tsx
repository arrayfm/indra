'use client'

import { typePPMori } from '@/lib/utils/font'
import { AnimatedComponent } from '../layout/animated-component'
import { formatBookingDate, formatBookingTime } from '@/lib/utils/date-time'
import { cn } from '@/lib/utils/class-name'
import { Booking } from '@/types/semble'

export const PastAppointmentCard = ({ booking }: { booking: Booking }) => {
  return (
    <div key={booking.id} className="flex flex-col gap-4">
      <AnimatedComponent
        as="h3"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.1 }}
        className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}
      >
        {booking.appointment.title}
      </AnimatedComponent>

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.2 }}
      >
        <p className={cn('mb-1', typePPMori({ size: 'lg' }))}>
          {formatBookingDate(booking.start)}
        </p>
        <p className={cn(typePPMori({ size: 'md' }))}>
          {formatBookingTime(booking.start, booking.end)}
        </p>
      </AnimatedComponent>
    </div>
  )
}
