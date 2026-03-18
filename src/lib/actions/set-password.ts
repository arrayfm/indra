'use server'

import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../supabase/admin'

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

  const { data: record, error: fetchError } = await supabaseAdmin
    .from('registration_tokens')
    .select('email, expires_at, completed_at')
    .eq('token', token)
    .single()

  if (fetchError || !record) {
    return { error: 'Invalid or expired link. Please register again.' }
  }

  if (record.completed_at) {
    return { error: 'This link has already been used.' }
  }

  if (new Date(record.expires_at) < new Date()) {
    return { error: 'This link has expired. Please register again.' }
  }

  const { data: authUser, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email: record.email,
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
    .update({ id: authUser.user!.id })
    .eq('email', record.email)

  if (profileError) {
    console.error('Failed to link profile:', profileError)
  }

  await supabaseAdmin
    .from('registration_tokens')
    .update({ completed_at: new Date().toISOString() })
    .eq('token', token)

  redirect('/login?email=' + encodeURIComponent(record.email))
}
