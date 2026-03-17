'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/class-name'

const buttonVariants = cva(
  "inline-flex cursor-pointer text-md font-semibold items-center justify-center leading-none gap-2 whitespace-nowrap px-4.75 py-3.5 rounded-[200px] text-sm transition-[color,background-color,width,height,padding,font-size] duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      theme: {
        'mid-beige':
          'bg-mid-beige text-dark-purple group-hover:bg-mid-beige/80 hover:bg-mid-beige/80',
        purple:
          'bg-purple text-dark-purple group-hover:bg-purple/80 hover:bg-purple/80',
      },
      size: {
        default: '',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      theme: 'mid-beige',
      size: 'default',
    },
  }
)

function Button({
  className,
  theme,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  return (
    <motion.button
      data-slot="button"
      layout
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={cn(buttonVariants({ theme, size, className }))}
      {...(props as React.ComponentProps<typeof motion.button>)}
    />
  )
}

export { Button, buttonVariants }
