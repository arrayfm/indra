'use client'

import { cn } from '@/lib/utils/class-name'
import * as React from 'react'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'text-md text-dark-purple bg-mid-beige w-full rounded-[200px] px-4 py-3 leading-none transition-colors outline-none',
        'placeholder:text-grey-400 file:inline-flex',
        'focus-visible:bg-mid-beige focus:outline-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-orange/20 dark:aria-invalid:ring-orange/40 aria-invalid:border-orange-200',
        className
      )}
      {...props}
    />
  )
}

export { Input }
