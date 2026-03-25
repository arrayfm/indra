import { Booking } from '@/types/semble'
import { FutureAppointmentCard } from './future-appointment-card'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { AnimatedComponent } from '../layout/animated-component'

export const FutureAppointmentsGrid = ({
  appointments,
  title = 'Upcoming',
}: {
  appointments: Booking[]
  title?: string
}) => {
  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      <AnimatedComponent
        as="h2"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.1 }}
        className={cn(
          'text-grey-400 col-span-6 mb-2',
          typePPMori({ size: 'lg' })
        )}
      >
        {title}
      </AnimatedComponent>
      {appointments?.map((booking: any) => (
        <div key={booking.id} className="col-span-3">
          <FutureAppointmentCard booking={booking} />
        </div>
      ))}
    </div>
  )
}
