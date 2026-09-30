'use server'

import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../supabase/admin'
import { markTokenUsed, validateToken } from '../supabase/queries'

export type SetPasswordState = {
  error?: string
}

async function linkProfileToAuthUser(email: string, userId: string) {
  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .update({ id: userId, completed_at: new Date().toISOString() })
    .eq('email', email)
    .is('id', null)
    .select('id')
    .maybeSingle()

  if (error || !profile) {
    if (error) console.error('Failed to link profile:', error)
    return false
  }

  return true
}

async function findAuthUserIdByEmail(email: string) {
  const pageSize = 1000

  for (let page = 1; ; page += 1) {
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: pageSize })

    if (error) {
      console.error('Failed to list users:', error)
      return { error: true }
    }

    const user = users.find(
      (candidate) => candidate.email?.toLowerCase() === email.toLowerCase()
    )

    if (user) return { userId: user.id }
    if (users.length < pageSize) return { userId: null }
  }
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

  const { data: profile, error: profileLookupError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (profileLookupError || !profile) {
    if (profileLookupError)
      console.error('Failed to find registration profile:', profileLookupError)
    return { error: 'Failed to create account. Please try again.' }
  }

  if (profile.id) {
    return { error: 'An account with this email already exists.' }
  }

  const { data: authUser, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email: email,
      password,
      email_confirm: true,
    })

  if (createError) {
    if (createError.message.includes('already registered')) {
      const existingUser = await findAuthUserIdByEmail(email)

      if ('error' in existingUser || !existingUser.userId) {
        return { error: 'Failed to create account. Please contact support.' }
      }

      const { error: passwordError } =
        await supabaseAdmin.auth.admin.updateUserById(existingUser.userId, {
          password,
        })

      if (passwordError) {
        console.error('Failed to update recovered account password:', passwordError)
        return { error: 'Failed to create account. Please try again.' }
      }

      // A previous attempt may have created the Auth user before profile
      // linking failed. Finish the missing link on a valid retry.
      const linked = await linkProfileToAuthUser(email, existingUser.userId)

      if (!linked) {
        return { error: 'Failed to create account. Please contact support.' }
      }

      await markTokenUsed(token)
      redirect('/login?email=' + encodeURIComponent(email))
    }
    console.error('Supabase createUser error:', createError)
    return { error: 'Failed to create account. Please try again.' }
  }

  if (!authUser.user) {
    return { error: 'Failed to create account. Please try again.' }
  }

  const linked = await linkProfileToAuthUser(email, authUser.user.id)

  if (!linked) {
    const { error: deleteError } =
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)

    if (deleteError) {
      console.error('Failed to clean up unlinked Auth user:', deleteError)
      return { error: 'Failed to create account. Please contact support.' }
    }

    return { error: 'Failed to create account. Please try again.' }
  }

  await markTokenUsed(token)

  redirect('/login?email=' + encodeURIComponent(email))
}
