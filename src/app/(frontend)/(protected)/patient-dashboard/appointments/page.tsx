import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_BOOKINGS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { sortBookingsByDate } from '@/lib/semble/utils'
import { PastAppointmentCard } from '@/components/appointments/past-appointment-card'
import { FutureAppointmentsGrid } from '@/components/appointments/future-appointments-grid'
import { AnimatedComponent } from '@/components/layout/animated-component'

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(GET_PATIENT_BOOKINGS(profile?.semble_id))

  const { futureAppointments, pastAppointments } = sortBookingsByDate(
    response?.data?.patient?.bookings || []
  )

  return (
    <div className="flex flex-col gap-20">
      <FutureAppointmentsGrid appointments={futureAppointments} />

      <div className="grid grid-cols-6 gap-x-2.5 gap-y-10">
        <AnimatedComponent
          as="h2"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.1 }}
          className={cn(
            'text-grey-400 col-span-6 mb-2',
            typePPMori({ size: 'lg' })
          )}
        >
          Previous
        </AnimatedComponent>
        {pastAppointments?.map((booking: any) => (
          <div key={booking.id} className="col-span-3">
            <PastAppointmentCard booking={booking} />
          </div>
        ))}
      </div>
    </div>
  )
}
