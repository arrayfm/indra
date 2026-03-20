'use client'

import { useActionState, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { registerAction } from '@/lib/actions/register'
import { ConditionalLink } from '../elements/conditional-link'

const fieldVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
}

type Step = 'email' | 'dob'

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, {})
  const [emailValue, setEmailValue] = useState('')
  const [step, setStep] = useState<Step>('email')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailValid) setStep('dob')
  }

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
          If you have been onboarded by the team, you'll receive an email to set
          your password and complete your signup. It expires in 1 hour.
        </p>
      </div>
    )
  }

  return (
    <form action={action}>
      <AnimatePresence mode="wait">
        {step === 'email' ? (
          <motion.div
            key="email"
            className="mb-4"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
              onKeyDown={(e) => e.key === 'Enter' && handleEmailContinue(e)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dob"
            className="mb-4"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <label
              className={cn('mb-1.5', typePPMori({ size: 'md' }))}
              htmlFor="dob"
            >
              Date of birth
            </label>
            <Input
              id="dob"
              name="dob"
              type="date"
              required
              disabled={isPending}
              autoFocus
            />
            <input type="hidden" name="email" value={emailValue} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <label
          className={cn('mb-1.5', typePPMori({ size: 'md' }))}
          htmlFor="send_email"
        >
          Send Email
        </label>
        <Input
          id="send_email"
          name="send_email"
          type="email"
          autoComplete="email"
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-2.5">
        {step === 'email' ? (
          <Button
            type="button"
            theme="purple"
            disabled={!emailValid}
            onClick={handleEmailContinue}
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" theme="purple" disabled={isPending}>
            {isPending ? 'Checking…' : 'Validate'}
          </Button>
        )}

        <p className={typePPMori({ size: 'sm' })}>
          Already registered?{' '}
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
