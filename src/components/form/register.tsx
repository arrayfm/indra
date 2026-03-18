'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { registerAction } from '@/lib/actions/register'
import { ConditionalLink } from '../elements/conditional-link'

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, {})

  if (state?.success) {
    return (
      <div>
        <p className={typePPMori({ size: 'md' })}>Check your inbox</p>
        <p className={cn('mt-1 text-neutral-500', typePPMori({ size: 'sm' }))}>
          We've sent a link to set your password. It expires in 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form action={action}>
      <div className="mb-4">
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
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Checking…' : 'Validate'}
        </Button>

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
