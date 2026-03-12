'use client'

import { cn } from '@/lib/utils/class-name'
import * as React from 'react'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'placeholder:text-grey-300 text-grey-200 w-full border-b bg-transparent px-4 py-1 text-center text-lg transition-colors outline-none file:inline-flex focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:text-xl',
        'focus-visible:bg-mono-700',
        'aria-invalid:ring-orange/20 dark:aria-invalid:ring-orange/40 aria-invalid:border-orange-200',
        className
      )}
      {...props}
    />
  )
}

export { Input }
