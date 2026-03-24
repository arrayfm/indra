import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_BOOKINGS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { sortBookingsByDate } from '@/lib/semble/utils'
import { PastAppointmentCard } from '@/components/appointments/past-appointment-card'
import { FutureAppointmentsGrid } from '@/components/appointments/future-appointments-grid'

export const MOCK_FUTURE_APPOINTMENTS = [
  {
    id: '123',
    start: '2026-04-05T15:00:00.000Z',
    end: '2026-04-05T15:15:00.000Z',
    videoUrl:
      'https://patients.semble.io/video-consultation/3379ef385737a6d3193bd07df33fa3345dd588f4',
    appointment: { title: '(FAKE) A3. Indra Additional' },
  },
  {
    id: '234',
    start: '2026-06-08T15:00:00.000Z',
    end: '2026-06-08T15:15:00.000Z',
    videoUrl:
      'https://patients.semble.io/video-consultation/3379ef385737a6d3193bd07df33fa3345dd588f4',
    appointment: { title: '(FAKE) A3. Indra Additional' },
  },
]

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(GET_PATIENT_BOOKINGS(profile?.semble_id))

  const { futureAppointments, pastAppointments } = sortBookingsByDate(
    response?.data?.patient?.bookings || []
  )

  const tempFutureAppointments = futureAppointments?.length
    ? futureAppointments
    : MOCK_FUTURE_APPOINTMENTS

  return (
    <div className="flex flex-col gap-20">
      <FutureAppointmentsGrid appointments={tempFutureAppointments} />

      <div className="grid grid-cols-6 gap-x-2.5 gap-y-10">
        <h2
          className={cn(
            'text-grey-400 col-span-6 mb-2',
            typePPMori({ size: 'lg' })
          )}
        >
          Previous
        </h2>
        {pastAppointments?.map((booking: any) => (
          <div key={booking.id} className="col-span-3">
            <PastAppointmentCard booking={booking} />
          </div>
        ))}
      </div>
    </div>
  )
}
