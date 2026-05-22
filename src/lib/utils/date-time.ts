import { DateTime } from 'luxon'

export function formatBookingDate(start: string, tz?: string): string {
  return DateTime.fromISO(start, { zone: tz }).toFormat('EEE d MMMM')
}

export function formatPrescriptionDate(start: string, tz?: string): string {
  return DateTime.fromISO(start, { zone: tz }).toLocaleString(
    DateTime.DATE_SHORT
  )
}

export function formatInvoiceDate(start: string, tz?: string): string {
  return DateTime.fromISO(start, { zone: tz }).toLocaleString(
    DateTime.DATE_SHORT
  )
}

export function formatBookingTime(
  start: string,
  end?: string,
  tz?: string
): string {
  const TIME_WITH_OFFSET: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  const TIME_SIMPLE: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  }

  const startDt = DateTime.fromISO(start, { zone: tz })
  const endDt = end ? DateTime.fromISO(end, { zone: tz }) : undefined

  const startTime = startDt.toLocaleString(
    endDt ? TIME_SIMPLE : TIME_WITH_OFFSET
  )
  const endTime = endDt?.toLocaleString(TIME_WITH_OFFSET)

  return end ? `${startTime} — ${endTime}` : startTime
}
