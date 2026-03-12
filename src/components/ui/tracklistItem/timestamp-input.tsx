'use client'

import { cn } from '@/lib/utils/class-name'
import { useEffect, useRef, useState } from 'react'

type TimestampInputProps = {
  value?: string
  onChange?: (value: string) => void
}

export const TimestampInput = ({
  value = '00:00',
  onChange,
}: TimestampInputProps) => {
  const [minutes, setMinutes] = useState(value.split(':')[0] || '00')
  const [seconds, setSeconds] = useState(value.split(':')[1] || '00')
  const [error, setError] = useState(false)
  const minutesInputRef = useRef<HTMLInputElement | null>(null)
  const secondsInputRef = useRef<HTMLInputElement | null>(null)
  const minutesSizeRef = useRef<HTMLDivElement | null>(null)
  const secondsSizeRef = useRef<HTMLDivElement | null>(null)

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    val = val.length > 3 ? val.slice(0, 3) : val
    setMinutes(val)
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    val = val.length > 2 ? val.slice(0, 2) : val
    setSeconds(val)
  }

  const handleBlur = () => {
    let min = minutes.padStart(2, '0')
    let sec = seconds.padStart(2, '0')

    if (parseInt(sec) > 59) {
      sec = '59'
      setError(true)
    } else {
      setError(false)
    }

    const formattedValue = `${min}:${sec}`
    setMinutes(min)
    setSeconds(sec)

    if (onChange) onChange(formattedValue)
  }

  useEffect(() => {
    if (minutesSizeRef.current) {
      const size = minutesSizeRef.current.getBoundingClientRect()
      if (minutesInputRef.current) {
        minutesInputRef.current.style.width = `${size.width}px`
      }
    }
  }, [minutes])

  useEffect(() => {
    if (secondsSizeRef.current) {
      const size = secondsSizeRef.current.getBoundingClientRect()
      if (secondsInputRef.current) {
        secondsInputRef.current.style.width = `${size.width}px`
      }
    }
  }, [seconds])

  return (
    <div
      className={cn(
        'text-mono-500 flex w-[70px] items-center gap-0.5 border-b',
        {
          'border-red-500': error,
          'border-transparent': !error,
        }
      )}
      onBlur={handleBlur}
    >
      <div
        ref={minutesSizeRef}
        className="pointer-events-none absolute opacity-0"
      >
        {minutes}
      </div>
      <input
        type="text"
        ref={minutesInputRef}
        className="hover:text-mono-600 cursor-pointer bg-transparent outline-none"
        value={minutes}
        onChange={handleMinutesChange}
        style={{ width: '35px' }}
      />
      <span>:</span>
      <div
        ref={secondsSizeRef}
        className="pointer-events-none absolute opacity-0"
      >
        {seconds}
      </div>
      <input
        type="text"
        ref={secondsInputRef}
        className="hover:text-mono-600 cursor-pointer bg-transparent outline-none"
        value={seconds}
        onChange={handleSecondsChange}
        style={{ width: '25px' }}
      />
    </div>
  )
}
