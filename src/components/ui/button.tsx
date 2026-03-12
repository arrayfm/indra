import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/class-name'

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      theme: {
        black: '',
        'mono-100': '',
        'mono-200': '',
        'mono-300': '',
      },
      variant: {
        basic: 'border font-semibold',
        outline: 'border font-semibold',
      },
      size: {
        default: '',
        icon: 'size-9',
      },
    },
    compoundVariants: [
      {
        theme: 'black',
        variant: 'basic',
        class: 'bg-black text-white hover:bg-black/90',
      },
      {
        theme: 'mono-100',
        variant: 'basic',
        class: 'bg-mono-100 text-black hover:bg-mono-200',
      },
      {
        theme: 'mono-200',
        variant: 'basic',
        class: 'bg-mono-200 text-black hover:bg-mono-300',
      },
      {
        theme: 'mono-200',
        variant: 'basic',
        class: 'bg-mono-200 text-black hover:bg-mono-300',
      },
      {
        theme: 'mono-300',
        variant: 'basic',
        class: 'bg-mono-300 text-black hover:bg-mono-400',
      },
    ],
    defaultVariants: {
      theme: 'mono-200',
      variant: 'basic',
      size: 'default',
    },
  }
)

function Button({
  className,
  theme,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ theme, variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
