import { typePPMori } from '@/lib/utils/font'
import { formatBookingDate, formatBookingTime } from '@/lib/utils/date-time'
import { cn } from '@/lib/utils/class-name'
import { Booking } from '@/types/semble'

export const PastAppointmentCard = ({ booking }: { booking: Booking }) => {
  return (
    <div key={booking.id} className="flex flex-col gap-4">
      <h3 className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
        {booking.appointment.title}
      </h3>
      <div>
        <p className={cn('mb-1', typePPMori({ size: 'lg' }))}>
          {formatBookingDate(booking.start)}
        </p>
        <p className={cn(typePPMori({ size: 'md' }))}>
          {formatBookingTime(booking.start, booking.end)}
        </p>
      </div>
    </div>
  )
}
