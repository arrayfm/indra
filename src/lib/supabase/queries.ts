import { supabaseAdmin } from './admin'
import crypto from 'crypto'

export const getProfile = async (userId?: string) => {
  if (!userId) return null

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function validateToken(
  token: string,
  type: 'registration' | 'password_reset'
) {
  const { data: record, error } = await supabaseAdmin
    .from('tokens')
    .select('email, expires_at, used_at')
    .eq('token', token)
    .eq('type', type)
    .single()

  if (error || !record) return { error: 'Invalid or expired link.' }
  if (record.used_at) return { error: 'This link has already been used.' }
  if (new Date(record.expires_at) < new Date())
    return { error: 'This link has expired.' }

  return { email: record.email }
}

export async function markTokenUsed(token: string) {
  await supabaseAdmin
    .from('tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('token', token)
}

export async function createToken(
  email: string,
  type: 'registration' | 'password_reset'
) {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60)

  const { error } = await supabaseAdmin.from('tokens').upsert({
    email,
    type,
    token,
    expires_at: expiresAt.toISOString(),
    used_at: null,
  })

  if (error) throw error
  return token
}
