'use server'

import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../supabase/admin'
import {
  claimToken,
  completeTokenClaim,
  releaseTokenClaim,
  validateToken,
} from '../supabase/queries'

export type ResetPasswordState = {
  error?: string
}

export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const token = formData.get('token') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!token || !password) {
    return { error: 'Invalid request.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const { email, error: tokenError } = await validateToken(
    token,
    'password_reset'
  )

  if (tokenError) {
    return { error: tokenError }
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  if (profileError) {
    console.error('Failed to find profile:', profileError)
    return { error: 'Something went wrong. Please try again.' }
  }

  let authUserId = profile?.id

  // Completed profiles are linked to auth.users through profiles.id. Retain a
  // paginated fallback for legacy profiles that were not linked successfully.
  if (!authUserId) {
    const pageSize = 1000

    for (let page = 1; ; page += 1) {
      const {
        data: { users },
        error: listError,
      } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: pageSize })

      if (listError) {
        console.error('Failed to list users:', listError)
        return { error: 'Something went wrong. Please try again.' }
      }

      const authUser = users.find(
        (user) => user.email?.toLowerCase() === email.toLowerCase()
      )

      if (authUser) {
        authUserId = authUser.id
        break
      }

      if (users.length < pageSize) break
    }
  }

  if (!authUserId) {
    return { error: 'No account found for this email.' }
  }

  const claim = await claimToken(token, 'password_reset')

  if ('error' in claim) {
    return { error: claim.error }
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    authUserId,
    { password }
  )

  if (updateError) {
    console.error('Failed to update password:', updateError)
    await releaseTokenClaim(token, 'password_reset', claim.lockId)
    return { error: 'Failed to reset password. Please try again.' }
  }

  const completion = await completeTokenClaim(
    token,
    'password_reset',
    claim.lockId
  )

  // The password change succeeded. Do not invite a retry if recording the
  // completed claim has a transient failure, as that could change it again.
  if (completion.error) {
    console.error('Password reset token was not marked used after update.')
  }

  redirect('/login?reset=true')
}
