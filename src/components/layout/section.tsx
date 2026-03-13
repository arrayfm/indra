import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { slugify } from '@/lib/utils/string'
import { HashLink } from '@/components/elements/hash-link'
import { cn } from '@/lib/utils/class-name'

const sectionVariants = cva('relative', {
  variants: {
    padding: {
      none: '',
      md: 'py-6 lg:py-8',
    },
    theme: {
      none: '',
    },
  },
  defaultVariants: {
    padding: 'none',
    theme: 'none',
  },
})

export interface SectionProps
  extends
    React.ComponentProps<'section'>,
    VariantProps<typeof sectionVariants> {
  id: string
  asChild?: boolean
  children: React.ReactNode
}

function Section({
  id,
  className,
  padding,
  theme,
  asChild = false,
  children,
  ...props
}: SectionProps) {
  const sectionId = slugify(id)

  return (
    <section
      id={sectionId}
      data-slot="section"
      className={cn(sectionVariants({ padding, theme }), className)}
      {...props}
    >
      <HashLink id={sectionId} />
      {children}
    </section>
  )
}

export { Section, sectionVariants }
