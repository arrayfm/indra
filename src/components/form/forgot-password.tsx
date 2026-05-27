'use client'

import { useActionState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { forgotPasswordAction } from '@/lib/actions/forgot-password'
import { ConditionalLink } from '../elements/conditional-link'
import { useState } from 'react'

const fieldVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
}

export const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {})
  const [emailValue, setEmailValue] = useState('')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)

  if (state?.success) {
    return (
      <div>
        <p className={typePPMori({ size: 'lg' })}>Check your inbox</p>
        <p
          className={cn(
            'text-grey-400 mt-1 max-w-120',
            typePPMori({ size: 'md' })
          )}
        >
          If an account exists for {emailValue}, you&apos;ll receive a password
          reset link shortly. It expires in 1 hour.
        </p>
      </div>
    )
  }

  return (
    <form action={action}>
      <motion.div
        className="mb-4"
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <label
          className={cn('mb-1.5', typePPMori({ size: 'md' }))}
          htmlFor="email"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </motion.div>

      <div className="flex items-center gap-2.5">
        <Button
          type="submit"
          theme="purple"
          disabled={!emailValid || isPending}
        >
          {isPending ? 'Sending…' : 'Send reset link'}
        </Button>

        <p className={typePPMori({ size: 'sm' })}>
          Remembered it?{' '}
          <ConditionalLink href="/login" className="border-link">
            Login
          </ConditionalLink>
        </p>
      </div>

      {state?.error && (
        <p className={cn('mt-3 text-red-600', typePPMori({ size: 'sm' }))}>
          {state.error}
        </p>
      )}
    </form>
  )
}
