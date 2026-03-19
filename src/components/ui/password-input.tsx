'use client'

import * as React from 'react'
import { PiEye, PiEyeClosed } from 'react-icons/pi'
import { cn } from '@/lib/utils/class-name'

function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative w-full">
      <input
        type={visible ? 'text' : 'password'}
        data-slot="input"
        className={cn(
          'text-md text-dark-purple bg-mid-beige w-full rounded-[200px] px-4 py-3 pr-11 leading-none transition-colors outline-none',
          'placeholder:text-grey-400 file:inline-flex',
          'focus-visible:bg-mid-beige focus:outline-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:ring-orange/20 dark:aria-invalid:ring-orange/40 aria-invalid:border-orange-200',
          className
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="text-grey-400 hover:text-dark-purple absolute top-1/2 right-4 -translate-y-1/2 transition-colors focus:outline-none disabled:pointer-events-none"
      >
        {!visible ? <PiEye size={18} /> : <PiEyeClosed size={18} />}
      </button>
    </div>
  )
}

export { PasswordInput }
