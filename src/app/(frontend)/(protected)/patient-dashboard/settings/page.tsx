import { sembleQuery } from '@/lib/semble/client'
import { GET_PATIENT_PRESCRIPTIONS } from '@/lib/semble/queries'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { DateTime } from 'luxon'
import { ResetPasswordButton } from '@/components/ui/reset-password-button'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '@/components/elements/conditional-link'
import { Button } from '@/components/ui/button'
import { AnimatedComponent } from '@/components/layout/animated-component'

export default async function Appointments() {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  const response = await sembleQuery(
    GET_PATIENT_PRESCRIPTIONS(profile?.semble_id)
  )

  const prescriptions = response?.data?.patient?.prescriptions.data
    ?.slice()
    .sort(
      (a: any, b: any) =>
        DateTime.fromISO(b.date).toMillis() -
        DateTime.fromISO(a.date).toMillis()
    )

  return (
    <div className="flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid">
      <div className="col-span-3 flex flex-col gap-2">
        <AnimatedComponent
          as="h3"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.1 }}
          className={cn(typePPMori({ size: 'lg' }))}
        >
          Manage billing
        </AnimatedComponent>
        <AnimatedComponent
          as="p"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.2 }}
          className={cn(
            'text-grey-400 mb-4 max-w-xs',
            typePPMori({ size: 'md' })
          )}
        >
          Manage billing, cancel your subscription and update payment methods
        </AnimatedComponent>

        <AnimatedComponent
          as="div"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.3 }}
        >
          <ConditionalLink
            href="https://billing.stripe.com/p/login/dRm00ifrAfOzbtD224f3a00"
            target="_blank"
          >
            <Button>Manage</Button>
          </ConditionalLink>
        </AnimatedComponent>
      </div>
      <div className="col-span-3 flex flex-col gap-2">
        <AnimatedComponent
          as="h3"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.1 }}
          className={cn(typePPMori({ size: 'lg' }))}
        >
          Reset password
        </AnimatedComponent>
        <AnimatedComponent
          as="p"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.2 }}
          className={cn('text-grey-400 mb-4', typePPMori({ size: 'md' }))}
        >
          Forgot or need to reset your password?
        </AnimatedComponent>

        <AnimatedComponent
          as="div"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.3 }}
        >
          <ResetPasswordButton email={profile.email} />
        </AnimatedComponent>
      </div>
    </div>
  )
}
