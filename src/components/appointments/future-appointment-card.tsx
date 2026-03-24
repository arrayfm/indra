import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { formatBookingDate, formatBookingTime } from '@/lib/utils/date-time'
import { cn } from '@/lib/utils/class-name'
import { Booking } from '@/types/semble'

export const FutureAppointmentCard = ({ booking }: { booking: Booking }) => {
  return (
    <div key={booking.id} className="flex flex-col gap-4">
      <h3 className={cn(typePPMori({ size: 'lg', weight: 'semibold' }))}>
        {booking.appointment.title}
      </h3>
      <div>
        <p className={cn('mb-1', typePPMori({ size: '2xl' }))}>
          {formatBookingDate(booking.start)}
        </p>
        <p className={cn(typePPMori({ size: 'lg' }))}>
          {formatBookingTime(booking.start, booking.end)}
        </p>
      </div>
      <ConditionalLink
        href={booking.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Join Meeting</Button>
      </ConditionalLink>
    </div>
  )
}
