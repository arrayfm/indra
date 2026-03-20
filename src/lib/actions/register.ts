'use server'

import { Resend } from 'resend'
import { supabaseAdmin } from '../supabase/admin'
import { RegisterLinkEmailTemplate } from '@/components/email/register-link'
import { sembleQuery } from '../semble/client'
import { GET_PATIENT_BY_EMAIL } from '../semble/queries'
import { createToken } from '../supabase/queries'

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
  const dob = (formData.get('dob') as string)?.trim()
  const sendEmail = (formData.get('send_email') as string)?.toLowerCase().trim()

  if (!email) return { error: 'Email is required.' }
  if (!dob) return { error: 'Date of birth is required.' }

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

  const sembleDob = patient?.dob?.slice(0, 10)

  if (!patient || sembleDob !== dob) {
    return { error: "Sorry, we couldn't find a matching patient." }
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

  const token = await createToken(email, 'registration')

  if (!token) {
    return { error: 'Failed to create registration token. Please try again.' }
  }

  const magicLink = `${NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`

  const { error: emailError } = await resend.emails.send({
    from: 'alexsimpson@array.design',
    to: sendEmail || email,
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
