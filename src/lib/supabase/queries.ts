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

export async function consumeToken(
  token: string,
  type: 'registration' | 'password_reset'
) {
  const now = new Date().toISOString()

  const { data: record, error } = await supabaseAdmin
    .from('tokens')
    .update({ used_at: now })
    .eq('token', token)
    .eq('type', type)
    .is('used_at', null)
    .gt('expires_at', now)
    .select('email')
    .maybeSingle()

  if (error) {
    console.error('Failed to consume token:', error)
    return { error: 'Invalid or expired link.' }
  }

  if (!record) {
    return { error: 'Invalid, expired, or already used link.' }
  }

  return { email: record.email }
}

const TOKEN_LOCK_TIMEOUT_MS = 5 * 60 * 1000

export async function claimToken(
  token: string,
  type: 'password_reset'
) {
  const now = new Date()
  const lockId = crypto.randomUUID()
  const lockTimeout = new Date(now.getTime() - TOKEN_LOCK_TIMEOUT_MS)

  const { data: record, error } = await supabaseAdmin
    .from('tokens')
    .update({ locked_at: now.toISOString(), locked_by: lockId })
    .eq('token', token)
    .eq('type', type)
    .is('used_at', null)
    .gt('expires_at', now.toISOString())
    .or(
      `locked_at.is.null,locked_at.lt.${lockTimeout.toISOString()}`
    )
    .select('email')
    .maybeSingle()

  if (error) {
    console.error('Failed to claim token:', error)
    return { error: 'Something went wrong. Please try again.' }
  }

  if (!record) {
    return {
      error:
        'This link is invalid, expired, already used, or is being processed. Please try again shortly.',
    }
  }

  return { email: record.email, lockId }
}

export async function completeTokenClaim(
  token: string,
  type: 'password_reset',
  lockId: string
) {
  const { data: record, error } = await supabaseAdmin
    .from('tokens')
    .update({
      used_at: new Date().toISOString(),
      locked_at: null,
      locked_by: null,
    })
    .eq('token', token)
    .eq('type', type)
    .eq('locked_by', lockId)
    .is('used_at', null)
    .select('email')
    .maybeSingle()

  if (error || !record) {
    if (error) console.error('Failed to complete token claim:', error)
    return { error: 'Failed to complete token claim.' }
  }

  return { email: record.email }
}

export async function releaseTokenClaim(
  token: string,
  type: 'password_reset',
  lockId: string
) {
  const { error } = await supabaseAdmin
    .from('tokens')
    .update({ locked_at: null, locked_by: null })
    .eq('token', token)
    .eq('type', type)
    .eq('locked_by', lockId)
    .is('used_at', null)

  if (error) console.error('Failed to release token claim:', error)
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
