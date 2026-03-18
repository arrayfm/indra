'use client'

import { useActionState, useRef, useState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { loginAction } from '@/lib/actions/login'
import { ConditionalLink } from '../elements/conditional-link'

export const LoginForm = ({ email }: { email?: string }) => {
  const [state, action, isPending] = useActionState(loginAction, {})
  const emailRef = useRef<HTMLInputElement>(null)

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
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          defaultValue={email}
        />
      </div>

      <div className="mb-6">
        <label
          className={cn('mb-1.5', typePPMori({ size: 'md' }))}
          htmlFor="password"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign In'}
        </Button>

        <p className={typePPMori({ size: 'sm' })}>
          Haven't registered yet?{' '}
          <ConditionalLink href="/register" className="border-link">
            Register
          </ConditionalLink>
        </p>

        {state?.error && (
          <p className={cn('text-red-600', typePPMori({ size: 'sm' }))}>
            {state.error}
          </p>
        )}
      </div>
    </form>
  )
}
