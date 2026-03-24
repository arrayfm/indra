import { Booking } from '@/types/semble'
import { FutureAppointmentCard } from './future-appointment-card'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'

export const FutureAppointmentsGrid = ({
  appointments,
  title = 'Upcoming',
}: {
  appointments: Booking[]
  title?: string
}) => {
  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      <h2
        className={cn(
          'text-grey-400 col-span-6 mb-2',
          typePPMori({ size: 'lg' })
        )}
      >
        {title}
      </h2>
      {appointments?.map((booking: any) => (
        <div key={booking.id} className="col-span-3">
          <FutureAppointmentCard booking={booking} />
        </div>
      ))}
    </div>
  )
}
