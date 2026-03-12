export const parseDate = (
  dateString: string | null | undefined
): Date | null => {
  return dateString ? new Date(dateString) : null
}

export const formatDate = (
  dateString: string | null | undefined,
  format: string = 'dd MMMM yyyy'
): string | null => {
  const date = parseDate(dateString)
  if (!date) return null

  const options: Intl.DateTimeFormatOptions = {
    day: undefined,
    month: undefined,
    year: undefined,
  }

  let formattedDate = ''

  if (format.includes('dd')) {
    options.day = '2-digit'
  } else if (format.includes('d')) {
    options.day = 'numeric'
  }

  if (format.includes('MMMM')) {
    options.month = 'long'
  } else if (format.includes('MMM')) {
    options.month = 'short'
  } else if (format.includes('MM')) {
    options.month = '2-digit'
  }

  if (format.includes('yyyy')) {
    options.year = 'numeric'
  } else if (format.includes('yy')) {
    options.year = '2-digit'
  }

  const dateStringArray = format.split(' ')
  dateStringArray.map((item, index) => {
    if (index !== 0) formattedDate += ' '
    if (item.includes('d')) {
      formattedDate += new Intl.DateTimeFormat('en-US', {
        day: options.day,
      }).format(date)
    } else if (item.includes('M')) {
      formattedDate += new Intl.DateTimeFormat('en-US', {
        month: options.month,
      }).format(date)
    } else if (item.includes('y')) {
      formattedDate += new Intl.DateTimeFormat('en-US', {
        year: options.year,
      }).format(date)
    } else {
      formattedDate += item
    }
  })

  return formattedDate
}
