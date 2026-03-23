'use server'

import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../supabase/admin'
import { markTokenUsed, validateToken } from '../supabase/queries'

export type SetPasswordState = {
  error?: string
}

export async function setPasswordAction(
  _prev: SetPasswordState,
  formData: FormData
): Promise<SetPasswordState> {
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
    'registration'
  )

  if (tokenError) {
    return { error: tokenError }
  }

  const { data: authUser, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email: email,
      password,
      email_confirm: true,
    })

  if (createError) {
    if (createError.message.includes('already registered')) {
      return { error: 'An account with this email already exists.' }
    }
    console.error('Supabase createUser error:', createError)
    return { error: 'Failed to create account. Please try again.' }
  }

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({ id: authUser.user!.id, completed_at: new Date().toISOString() })
    .eq('email', email)

  if (profileError) {
    console.error('Failed to link profile:', profileError)
  }

  await markTokenUsed(token)

  redirect('/login?email=' + encodeURIComponent(email))
}
