'use server'

import { Resend } from 'resend'
import crypto from 'crypto'
import { supabaseAdmin } from '../supabase/admin'

export type RegisterState = {
  error?: string
  success?: boolean
}

const ALLOWED_EMAILS = new Set(['alexsimpson@array.design'])

const resend = new Resend(process.env.RESEND_API_KEY)

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()

  if (!email) {
    return { error: 'Email is required.' }
  }

  if (!ALLOWED_EMAILS.has(email)) {
    return { error: "We couldn't find that email in our system." }
  }

  const { data: existingUsers } = await supabaseAdmin
    .from('registration_tokens')
    .select('email, completed_at')
    .eq('email', email)
    .single()

  if (existingUsers?.completed_at) {
    return {
      error: 'This email is already registered. Try logging in instead.',
    }
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60)

  const { error: dbError } = await supabaseAdmin
    .from('registration_tokens')
    .upsert({
      email,
      token,
      expires_at: expiresAt.toISOString(),
      completed_at: null,
    })

  if (dbError) {
    console.error('DB error storing token:', dbError)
    return { error: 'Something went wrong. Please try again.' }
  }

  const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/set-password?token=${token}`

  const { error: emailError } = await resend.emails.send({
    from: 'alexsimpson@array.design',
    to: email,
    subject: 'Complete your registration',
    html: `
      <p>Hi,</p>
      <p>Click the link below to set your password and complete your registration. This link expires in 1 hour.</p>
      <p><a href="${magicLink}">Set my password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return { error: 'Failed to send the email. Please try again.' }
  }

  return { success: true }
}
