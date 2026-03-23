'use client'

import { useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const YEARS = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, i) => 1900 + i
)

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => (
  <div className="flex items-center justify-center gap-2 p-2">
    <button
      type="button"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="mr-auto"
    >
      {'<'}
    </button>
    <select
      value={date.getFullYear()}
      onChange={(e) => changeYear(+e.target.value)}
    >
      {YEARS.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
    <select
      value={MONTHS[date.getMonth()]}
      onChange={(e) => changeMonth(MONTHS.indexOf(e.target.value as any))}
    >
      {MONTHS.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
    <button
      type="button"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="ml-auto"
    >
      {'>'}
    </button>
  </div>
)

type Props = {
  value: Date | null
  onChange: (date: Date | null) => void
  focus?: boolean
  disabled?: boolean
}

export const DateOfBirthPicker = ({
  value,
  onChange,
  focus,
  disabled,
}: Props) => {
  const ref = useRef<DatePicker>(null)

  useEffect(() => {
    if (focus) {
      setTimeout(() => ref.current?.setFocus(), 300)
    }
  }, [focus])

  return (
    <>
      <DatePicker
        ref={ref}
        renderCustomHeader={CustomHeader}
        selected={value}
        onChange={onChange}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        formatWeekDay={(day) => day.charAt(0)}
        popperPlacement="bottom-start"
        disabled={disabled}
        className={cn(
          'text-md text-dark-purple bg-mid-beige w-full rounded-[200px] px-4 py-3 leading-none transition-colors outline-none',
          'placeholder:text-grey-400',
          'focus-visible:bg-mid-beige focus:outline-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
      <input
        type="hidden"
        name="dob"
        value={value ? value.toISOString() : ''}
      />
    </>
  )
}
