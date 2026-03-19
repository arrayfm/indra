'use server'

import { Resend } from 'resend'
import { supabaseAdmin } from '../supabase/admin'
import { createToken } from '../supabase/queries'
import { ResetPasswordEmailTemplate } from '@/components/email/reset-password'

const { NEXT_PUBLIC_BASE_URL } = process.env
const resend = new Resend(process.env.RESEND_API_KEY)

export type ForgotPasswordState = {
  error?: string
  success?: boolean
}

export async function forgotPasswordAction(
  _prev: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()

  if (!email) return { error: 'Email is required.' }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, first_name')
    .eq('email', email)
    .single()

  if (!profile) {
    return { success: true }
  }

  const token = await createToken(email, 'password_reset')

  if (!token) {
    return { error: 'Failed to create reset token. Please try again.' }
  }

  const resetLink = `${NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

  const { error: emailError } = await resend.emails.send({
    from: 'alexsimpson@array.design',
    to: 'joel@array.design',
    subject: 'Reset your password',
    react: ResetPasswordEmailTemplate({
      resetLink,
      firstName: profile.first_name,
    }),
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return { error: 'Failed to send the email. Please try again.' }
  }

  return { success: true }
}
