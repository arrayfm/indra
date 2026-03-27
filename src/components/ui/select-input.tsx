'use client'

import { cn } from '@/lib/utils/class-name'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SVG } from '../elements/svg'

type Option = {
  value: string
  label: string
}

type InputSelectProps = {
  options: Option[]
  inputName: string
  placeholder?: string
  resetTrigger?: boolean
  onSelect?: (option: Option) => void
}

export const SelectInput: React.FC<InputSelectProps> = ({
  options,
  inputName,
  placeholder = 'Select an option',
  resetTrigger,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({})
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const inputRef = useRef<HTMLDivElement | null>(null)

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect?.(option)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
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
    if (isOpen && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect()
      setDropdownStyles({
        position: 'absolute',
        top: `${inputRect.bottom + 8 + window.scrollY}px`,
        left: `${inputRect.left + window.scrollX}px`,
        width: `${inputRect.width}px`,
        zIndex: 40,
      })
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedOption(undefined)
  }, [resetTrigger])

  return (
    <>
      <div className="text-dark-blue relative" ref={inputRef}>
        <input
          id={inputName}
          name={inputName}
          type="text"
          value={selectedOption?.label}
          className="pointer-events-none absolute h-full w-full opacity-0"
          required
        />
        <div
          className={cn(
            'text-md text-dark-purple bg-mid-beige flex w-full items-center justify-between rounded-[200px] px-4 py-3 leading-none transition-colors outline-none'
          )}
          onClick={(event) => handleOnClick(event)}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <SVG
            className={cn('transition-transform', {
              'rotate-180': isOpen,
            })}
            width={16}
            height={16}
          >
            <ChevronDownIcon />
          </SVG>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <ul
            ref={dropdownRef}
            style={dropdownStyles}
            className="text-dark-purple bg-mid-beige max-h-[400px] cursor-pointer overflow-y-auto rounded-xl shadow-xl"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="group p-1"
              >
                <div className="group-hover:bg-dark-purple rounded-xs p-1.5 transition-colors duration-100 group-hover:text-white">
                  {option.label}
                </div>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  )
}
