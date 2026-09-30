const padNumber = (num: number): string => num.toString().padStart(2, '0')

export const formatPlayerTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const displaySeconds = totalSeconds % 60
  const displayMinutes = totalMinutes % 60

  return totalHours > 0
    ? `${padNumber(totalHours)}:${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`
    : `${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`
}
