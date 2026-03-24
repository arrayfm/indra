import { DateTime } from 'luxon'

const now = DateTime.now()

export const sortBookingsByDate = (bookings: any[]) => {
  const futureAppointments = bookings
    .filter((booking: any) => DateTime.fromISO(booking.start) > now)
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(a.start).toMillis() -
        DateTime.fromISO(b.start).toMillis()
    )

  const pastAppointments = bookings
    .filter((booking: any) => DateTime.fromISO(booking.start) <= now)
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(b.start).toMillis() -
        DateTime.fromISO(a.start).toMillis()
    )

  return { futureAppointments, pastAppointments }
}
