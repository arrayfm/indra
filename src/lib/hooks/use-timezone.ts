'use client'

import { useState, useEffect } from 'react'

export function useTimezone() {
  const [tz, setTz] = useState<string | null>(null)

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return tz
}
