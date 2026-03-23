'use server'

import { Resend } from 'resend'
import { supabaseAdmin } from '../supabase/admin'
import { RegisterLinkEmailTemplate } from '@/components/email/register-link'
import { sembleQuery } from '../semble/client'
import { GET_PATIENT_BY_EMAIL } from '../semble/queries'
import { createToken } from '../supabase/queries'

export type RegisterState = {
  error?: string
  errorKey?: number
  success?: boolean
}

const GENERIC_ERROR_MESSAGE =
  'There was an error when registering patient details, please try again. If the issues persists, and you have been onboarded by the team, please contact us'

const { NEXT_PUBLIC_BASE_URL } = process.env
const resend = new Resend(process.env.RESEND_API_KEY)

const err = (error: string): RegisterState => ({ error, errorKey: Date.now() })

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()
  const dob = (formData.get('dob') as string)?.trim()
  const sendEmail = (formData.get('send_email') as string)?.toLowerCase().trim()

  const dateOnlyDob = dob ? new Date(dob) : null
  const isoDob = dateOnlyDob ? dateOnlyDob.toISOString().slice(0, 10) : null

  if (!email) return err('Email is required.')
  if (!dob) return err('Date of birth is required.')

  let patient
  try {
    const json = await sembleQuery(GET_PATIENT_BY_EMAIL(email))
    const results = json?.data?.patients?.data ?? []
    patient = results.find(
      (p: any) => p.email.toLowerCase() === email.toLowerCase()
    )
  } catch (error) {
    console.error('Semble lookup error:', error)
    return err(GENERIC_ERROR_MESSAGE)
  }

  const sembleDob = patient?.dob?.slice(0, 10)

  if (!patient || sembleDob !== isoDob) {
    return err(GENERIC_ERROR_MESSAGE)
  }

  const { data: existingUser, error: profileFetchError } = await supabaseAdmin
    .from('profiles')
    .select('email, completed_at')
    .eq('email', email)
    .single()

  if (existingUser?.completed_at) {
    return err(GENERIC_ERROR_MESSAGE)
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
    email,
    first_name: patient.firstName,
    last_name: patient.lastName,
    semble_id: patient.id,
  })

  if (profileError) {
    console.error('Profile upsert error:', profileError)
    return err('Something went wrong. Please try again.')
  }

  const token = await createToken(email, 'registration')

  if (!token) {
    return err('Failed to create registration token. Please try again.')
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
    return err('Failed to send the email. Please try again.')
  }

  return { success: true }
}
