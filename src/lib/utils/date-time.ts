import { DateTime } from 'luxon'

export function formatBookingDate(start: string): string {
  return DateTime.fromISO(start).toFormat('EEE d MMMM')
}

export function formatPrescriptionDate(start: string): string {
  return DateTime.fromISO(start).toLocaleString(DateTime.DATE_SHORT)
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
