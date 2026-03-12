'use client'

import { cn } from '@/lib/utils/class-name'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'
import React, { useState, useRef, useEffect } from 'react'
import { SVG } from '../elements/svg'

export type Option = {
  value: string | number
  label: string
  optionsLabel?: string
}

type InputSelectProps = {
  initialOptions: Option[] // Renamed to initialOptions
  inputName: string
  placeholder?: string
  initialOption?: Option
  value?: string | number
  labelClass?: string
  onChange?: (value: string | number | undefined) => void
  addValue?: (
    option: Omit<Option, 'value'>
  ) => Promise<{ success: boolean; id?: string | number; error?: any }>
}

export const SearchSelectInput: React.FC<InputSelectProps> = ({
  initialOptions, // Changed from options to initialOptions
  inputName,
  placeholder = 'Search',
  initialOption,
  value,
  labelClass = 'text-mono-500 hover:text-mono-600',
  onChange,
  addValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    initialOption
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState<Option[]>(initialOptions) // State for options
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (value) {
      const matchedOption = options.find((option) => option.value === value)
      setSelectedOption(matchedOption)
    }
  }, [value, options])

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleAddOption = async () => {
    if (addValue && searchTerm.length > 0) {
      const result = await addValue({ label: searchTerm })

      if (result?.success && result.id) {
        const newOption = { value: result.id, label: searchTerm }
        // Update options state directly
        setOptions((prevOptions) => [...prevOptions, newOption])
        setFilteredOptions((prevOptions) => [...prevOptions, newOption])
        setSelectedOption(newOption)
        setIsOpen(false)
        setSearchTerm('')
      } else {
        console.error('Failed to add artist:', result?.error)
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const optionsWithoutSelected = options.filter(
      (option) => option.value !== selectedOption?.value
    )

    setFilteredOptions(
      optionsWithoutSelected.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, options, selectedOption])

  useEffect(() => {
    if (onChange) onChange(selectedOption?.value)
  }, [selectedOption])

  return (
    <div ref={containerRef} className={cn('relative')}>
      <div
        className="flex cursor-pointer items-center justify-between gap-4"
        onClick={(event) => handleOnClick(event)}
      >
        <span
          className={cn('', {
            'text-mono-300 hover:text-mono-400': !selectedOption,
            [labelClass]: !!selectedOption,
          })}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </div>

      <ul
        className={cn(
          'text-dark-blue absolute -top-5 -left-5 z-20 max-h-[500px] min-w-[400px] translate-x-2 translate-y-2 cursor-pointer overflow-hidden overflow-y-auto rounded-xs bg-white p-1 shadow-md transition-opacity',
          {
            'pointer-events-none opacity-0': !isOpen,
            'pointer-events-auto opacity-100': isOpen,
          }
        )}
      >
        <li
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-xs p-2',
            {
              'bg-mono-50': !!selectedOption,
            }
          )}
        >
          {!selectedOption && (
            <>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="placeholder:text-mono-300 bg-transparent outline-none"
              />
              {searchTerm && (
                <button onClick={handleAddOption}>
                  <SVG width={16} height={16}>
                    <PlusIcon />
                  </SVG>
                </button>
              )}
            </>
          )}
          {selectedOption && (
            <>
              <span>{selectedOption.label}</span>

              <button onClick={() => setSelectedOption(undefined)}>
                <SVG className={cn()} width={16} height={16}>
                  <Cross1Icon />
                </SVG>
              </button>
            </>
          )}
        </li>

        {filteredOptions.map((option, index) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            className={cn(
              'border-mono-100 text-mono-500 px-2 py-2 transition-colors duration-100 hover:text-black',
              {
                'border-t': index !== 0,
              }
            )}
          >
            {option.optionsLabel || option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
