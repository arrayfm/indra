import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_BOOKINGS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '@/components/elements/conditional-link'
import { Button } from '@/components/ui/button'
import { DateTime } from 'luxon'

const MOCK_FUTURE_APPOINTMENTS = [
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

export function formatBookingDate(start: string): string {
  return DateTime.fromISO(start).toFormat('EEE d MMMM')
}

export function formatBookingTime(start: string, end?: string): string {
  const TIME_WITH_OFFSET: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  const startDt = DateTime.fromISO(start)
  const endDt = end ? DateTime.fromISO(end) : undefined

  const startTime = startDt.toLocaleString(
    endDt ? DateTime.TIME_SIMPLE : TIME_WITH_OFFSET
  )
  const endTime = endDt?.toLocaleString(TIME_WITH_OFFSET)

  return end ? `${startTime} — ${endTime}` : startTime
}

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(GET_PATIENT_BOOKINGS(profile?.semble_id))

  const now = DateTime.now()

  const futureAppointments = response?.data?.patient?.bookings
    .filter((booking: any) => DateTime.fromISO(booking.start) > now)
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(a.start).toMillis() -
        DateTime.fromISO(b.start).toMillis()
    )

  const pastAppointments = response?.data?.patient?.bookings
    .filter((booking: any) => DateTime.fromISO(booking.start) <= now)
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(b.start).toMillis() -
        DateTime.fromISO(a.start).toMillis()
    )

  const tempFutureAppointments = futureAppointments?.length
    ? futureAppointments
    : MOCK_FUTURE_APPOINTMENTS

  return (
    <div className="flex flex-col gap-20">
      <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
        <h2
          className={cn(
            'text-grey-400 col-span-6 mb-2',
            typePPMori({ size: 'lg' })
          )}
        >
          Upcoming
        </h2>
        {tempFutureAppointments?.map((booking: any) => (
          <div key={booking.id} className="col-span-3 flex flex-col gap-4">
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
        ))}
      </div>

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
          <div key={booking.id} className="col-span-3 flex flex-col gap-4">
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
        ))}
      </div>
    </div>
  )
}
