'use client'

import { useEffect, useState } from 'react'

type PhoneInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  resetTrigger?: boolean
}

export const PhoneInput = ({ resetTrigger, ...props }: PhoneInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/(?!^\+)\D/g, '')
    const isCountryCode = cleanedValue.startsWith('+')

    const numberParts = []

    if (isCountryCode) {
      if (cleanedValue.length > 0) {
        numberParts.push(cleanedValue.slice(0, 3))

        for (let i = 3; i < cleanedValue.length; i += 4) {
          numberParts.push(cleanedValue.slice(i, i + 4))
        }
      }
    } else {
      for (let i = 0; i < cleanedValue.length; i += 4) {
        numberParts.push(cleanedValue.slice(i, i + 4))
      }
    }

    const formattedNumber = numberParts.join(' ')

    return `${formattedNumber}`.trim()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const formattedValue = formatPhoneNumber(rawValue)
    setInputValue(formattedValue)
  }

  useEffect(() => {
    setInputValue('')
  }, [resetTrigger])

  return (
    <input
      type="tel"
      value={inputValue}
      onChange={handleChange}
      maxLength={16}
      {...props}
    />
  )
}
