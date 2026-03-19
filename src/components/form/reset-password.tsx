'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { resetPasswordAction } from '@/lib/actions/reset-password'
import { PasswordInput } from '../ui/password-input'

export const ResetPasswordForm = ({ token }: { token?: string }) => {
  const [state, action, isPending] = useActionState(resetPasswordAction, {})

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />

      <div className="mb-4">
        <label
          className={cn('mb-1.5', typePPMori({ size: 'md' }))}
          htmlFor="password"
        >
          New password
        </label>
        <PasswordInput
          id="password"
          name="password"
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
          Confirm new password
        </label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-5">
        <Button type="submit" theme="purple" disabled={isPending}>
          {isPending ? 'Resetting password…' : 'Reset password'}
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
