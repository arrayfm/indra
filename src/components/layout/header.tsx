'use client'

import Image from 'next/image'
import { ConditionalLink } from '../elements/conditional-link'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { logoutAction } from '@/lib/actions/logout'
import { Profile } from '@/types/supabase'
import { ResetPasswordButton } from '../ui/reset-password-button'
import { usePathname } from 'next/navigation'

type HeaderProps = {
  profile: Profile | null
}

const MENU_LINKS = [
  { label: 'Patient history', href: '/patient-history/appointments' },
  { label: 'Mind & body', href: '/modules' },
]

export const Header = ({ profile }: HeaderProps) => {
  const pathname = usePathname()
  const urlIncludes = (href: string) => pathname?.includes(href)
  return (
    <header className="relative z-60">
      <div className="container">
        <div className="flex items-center justify-between py-2.5">
          <nav>
            <ul className="flex items-center gap-2.5">
              <li className="group relative mr-7.5">
                <ConditionalLink href="/">
                  <Image
                    src="/images/indra-logo-purple.png"
                    alt="Indra logo"
                    width={70}
                    height={38}
                  />
                </ConditionalLink>
              </li>
              {MENU_LINKS.map((link) => (
                <li key={link.href}>
                  <ConditionalLink
                    href={link.href}
                    className={cn(
                      'transition-colors',
                      typePPMori({ size: 'md' }),
                      {
                        'text-dark-purple': urlIncludes(link.href),
                        'text-grey-400 border-link': !urlIncludes(link.href),
                      }
                    )}
                  >
                    {link.label}
                  </ConditionalLink>
                </li>
              ))}
            </ul>
          </nav>
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
                    <ConditionalLink
                      href="/"
                      className={cn(typePPMori({ size: 'md' }))}
                    >
                      Account{' '}
                    </ConditionalLink>
                    <span
                      className={cn(
                        'text-grey-400',
                        typePPMori({ size: 'md' })
                      )}
                    >
                      {profile.first_name ?? profile.email}
                    </span>
                    <div className="pointer-events-none absolute top-full right-0 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="bg-beige w-60 rounded-lg p-2.5 shadow-xl">
                        <p
                          className={cn(
                            'mb-4 overflow-hidden text-ellipsis',
                            typePPMori({ size: 'xl' })
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
