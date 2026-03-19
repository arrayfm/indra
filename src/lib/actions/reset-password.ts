'use server'

import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../supabase/admin'
import { validateToken } from '../supabase/queries'

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

  const {
    data: { users },
    error: listError,
  } = await supabaseAdmin.auth.admin.listUsers()

  if (listError) {
    console.error('Failed to list users:', listError)
    return { error: 'Something went wrong. Please try again.' }
  }

  const authUser = users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  )

  if (!authUser) {
    return { error: 'No account found for this email.' }
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    authUser.id,
    { password }
  )

  if (updateError) {
    console.error('Failed to update password:', updateError)
    return { error: 'Failed to reset password. Please try again.' }
  }

  await supabaseAdmin
    .from('password_reset_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('token', token)

  redirect('/login?reset=true')
}
