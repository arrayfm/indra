'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/lib/actions/forgot-password'
import { Button } from '../ui/button'

export const ResetPasswordButton = ({ email }: { email: string }) => {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {})

  return (
    <form action={action}>
      <input type="hidden" name="email" value={email} />
      <Button type="submit" disabled={isPending}>
        {isPending
          ? 'Sending…'
          : state?.success
            ? 'Email sent!'
            : 'Reset password'}
      </Button>
    </form>
  )
}
