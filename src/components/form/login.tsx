'use client'

import { useActionState, useRef, useState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { loginAction } from '@/lib/actions/login'
import { ConditionalLink } from '../elements/conditional-link'
import { PasswordInput } from '../ui/password-input'

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
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign In'}
        </Button>

        <div className="flex flex-col gap-1">
          <p className={typePPMori({ size: 'sm' })}>
            <ConditionalLink href="/register" className="border-link">
              Haven&apos;t registered yet? Register
            </ConditionalLink>
          </p>
          <p className={typePPMori({ size: 'sm' })}>
            <ConditionalLink href="/forgot-password" className="border-link">
              Forgot your password? Reset
            </ConditionalLink>
          </p>
        </div>

        {state?.error && (
          <p className={cn('text-red-600', typePPMori({ size: 'sm' }))}>
            {state.error}
          </p>
        )}
      </div>
    </form>
  )
}
