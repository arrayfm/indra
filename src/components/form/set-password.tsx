'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { Input } from '../ui/input'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { setPasswordAction } from '@/lib/actions/set-password'

export const SetPasswordForm = ({ token }: { token?: string }) => {
  const [state, action, isPending] = useActionState(setPasswordAction, {})

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />

      <div className="mb-4">
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
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isPending}
        />
      </div>

      <div className="mb-6">
        <label
          className={cn('mb-1.5', typePPMori({ size: 'md' }))}
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Creating account…' : 'Set password'}
        </Button>

        {state?.error && (
          <p className={cn('mt-3 text-red-600', typePPMori({ size: 'sm' }))}>
            {state.error}
          </p>
        )}
      </div>
    </form>
  )
}
