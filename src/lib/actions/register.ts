'use server'

import { Resend } from 'resend'
import crypto from 'crypto'
import { supabaseAdmin } from '../supabase/admin'
import { RegisterLinkEmailTemplate } from '@/components/email/register-link'
import { sembleQuery } from '../semble/client'
import { GET_PATIENT_BY_EMAIL } from '../semble/queries'

export type RegisterState = {
  error?: string
  success?: boolean
}

const { NEXT_PUBLIC_BASE_URL } = process.env
const resend = new Resend(process.env.RESEND_API_KEY)

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()

  if (!email) return { error: 'Email is required.' }

  let patient
  try {
    const json = await sembleQuery(GET_PATIENT_BY_EMAIL(email))
    const results = json?.data?.patients?.data ?? []
    patient = results.find(
      (p: any) => p.email.toLowerCase() === email.toLowerCase()
    )
  } catch (err) {
    console.error('Semble lookup error:', err)
    return { error: 'Something went wrong. Please try again.' }
  }

  if (!patient) {
    return { error: "We couldn't find that email in our system." }
  }

  const { data: existingUser } = await supabaseAdmin
    .from('profiles')
    .select('email, completed_at')
    .eq('email', email)
    .single()

  if (existingUser?.completed_at) {
    return {
      error: 'This email is already registered. Try logging in instead.',
    }
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
    email,
    first_name: patient.firstName,
    last_name: patient.lastName,
    semble_id: patient.id,
  })

  if (profileError) {
    console.error('Profile upsert error:', profileError)
    return { error: 'Something went wrong. Please try again.' }
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

  const magicLink = `${NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`

  const { error: emailError } = await resend.emails.send({
    from: 'alexsimpson@array.design',
    to: 'alexsimpson@array.design',
    subject: 'Complete your registration',
    react: RegisterLinkEmailTemplate({
      magicLink,
      firstName: patient.firstName,
    }),
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return { error: 'Failed to send the email. Please try again.' }
  }

  return { success: true }
}
