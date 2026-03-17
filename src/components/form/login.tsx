'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { loginAction } from '@/lib/actions/login'

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(loginAction, {})

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

      <div className="flex items-center gap-5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign In'}
        </Button>

        {state?.error && (
          <p className={cn('text-red-600', typePPMori({ size: 'sm' }))}>
            {state.error}
          </p>
        )}
      </div>
    </form>
  )
}
