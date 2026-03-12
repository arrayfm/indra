'use client'

import { cn } from '@/lib/utils/class-name'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

type ErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement> &
  React.ComponentPropsWithoutRef<typeof motion.p>

function ErrorMessage({ className, children, ...props }: ErrorMessageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        data-slot="error-message"
        data-state="error"
        role="alert"
        className={cn('absolute mt-1.5 text-sm text-orange-200', className)}
        {...props}
      >
        {children}
      </motion.p>
    </AnimatePresence>
  )
}

export { ErrorMessage }
