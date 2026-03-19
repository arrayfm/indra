import Image from 'next/image'
import { ConditionalLink } from '../elements/conditional-link'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { logoutAction } from '@/lib/actions/logout'
import { Profile } from '@/types/supabase'
import { ResetPasswordButton } from '../ui/reset-password-button'

type HeaderProps = {
  profile: Profile | null
}

export const Header = ({ profile }: HeaderProps) => {
  return (
    <header className="relative z-60">
      <div className="container">
        <div className="flex items-center justify-between py-2.5">
          <ConditionalLink href="/">
            <Image
              src="/images/indra-logo-purple.png"
              alt="Indra logo"
              width={70}
              height={38}
            />
          </ConditionalLink>
          <nav>
            <ul>
              <li className="group relative">
                {!profile && (
                  <ConditionalLink
                    href="/login"
                    className={cn('border-link', typePPMori({ size: 'md' }))}
                  >
                    Login
                  </ConditionalLink>
                )}
                {profile && (
                  <>
                    Account{' '}
                    <span className="text-grey-400">
                      {profile.first_name ?? profile.email}
                    </span>
                    <div className="pointer-events-none absolute top-full right-0 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="bg-beige w-60 rounded-lg p-2.5 drop-shadow-xl">
                        <p
                          className={cn(
                            'mb-4 overflow-hidden text-ellipsis',
                            typePPMori({ size: 'lg' })
                          )}
                        >
                          {profile.first_name ?? profile.email}
                        </p>
                        <p
                          className={cn(
                            'text-grey-400 mb-8',
                            typePPMori({ size: 'md' })
                          )}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Curabitur at ligula arcu.
                        </p>
                        <form action={logoutAction} className="mb-1.5">
                          <Button type="submit">Logout</Button>
                        </form>
                        <ResetPasswordButton email={profile.email} />
                      </div>
                    </div>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
