'use server'

import { Resend } from 'resend'
import { DateTime } from 'luxon'
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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { NEXT_PUBLIC_BASE_URL } = process.env
const resend = new Resend(process.env.RESEND_API_KEY)

const err = (error: string): RegisterState => ({ error, errorKey: Date.now() })

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()
  const dob = (formData.get('dob') as string)?.trim()

  const dobDateTime = dob ? DateTime.fromISO(dob) : null

  if (!email) return err('Email is required.')
  if (!EMAIL_PATTERN.test(email)) return err('Enter a valid email address.')
  if (!dob || !dobDateTime?.isValid) return err('Date of birth is required.')

  type PatientSearchResult = {
    id: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    dob?: string | null
  }

  const pageSize = 100
  let patient: PatientSearchResult | undefined
  try {
    for (let page = 1; ; page += 1) {
      const json = await sembleQuery(
        GET_PATIENT_BY_EMAIL(email, page, pageSize)
      )
      const results: PatientSearchResult[] = json?.data?.patients?.data ?? []

      patient = results.find(
        (candidate) => candidate.email?.toLowerCase() === email
      )

      if (patient || results.length < pageSize) break
    }
  } catch (error) {
    console.error('Semble lookup error:', error)
    return err(GENERIC_ERROR_MESSAGE)
  }

  const sembleDobDateTime = patient?.dob ? DateTime.fromISO(patient.dob) : null

  if (
    !patient ||
    !dobDateTime ||
    !sembleDobDateTime ||
    !sembleDobDateTime?.isValid ||
    !dobDateTime!.hasSame(sembleDobDateTime!, 'day')
  ) {
    return err(GENERIC_ERROR_MESSAGE)
  }

  const { data: existingUser } = await supabaseAdmin
    .from('profiles')
    .select('email, completed_at')
    .eq('email', email)
    .single()

  if (existingUser?.completed_at) {
    return err(
      'An account with this email already exists. Please log in instead.'
    )
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
    email,
    first_name: patient.firstName ?? undefined,
    last_name: patient.lastName ?? undefined,
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
    from: 'Indra portal <no-reply@array.design>',
    to: email,
    subject: 'Complete your registration',
    react: RegisterLinkEmailTemplate({
      magicLink,
      firstName: patient.firstName ?? undefined,
    }),
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return err('Failed to send the email. Please try again.')
  }

  return { success: true }
}
