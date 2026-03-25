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
  {
    label: 'Patient dashboard',
    href: '/patient-dashboard/appointments',
    parent: '/patient-dashboard',
  },
  { label: 'Mind & body', href: '/modules', parent: '/modules' },
  { label: 'IC Shop', href: '/shop', parent: '/shop' },
]

export const Header = ({ profile }: HeaderProps) => {
  const pathname = usePathname()
  const urlIncludes = (parent: string) => pathname?.includes(parent)

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
              {profile &&
                MENU_LINKS.map((link) => (
                  <li key={link.href}>
                    <ConditionalLink
                      href={link.href}
                      className={cn(
                        'hidden transition-colors md:block',
                        typePPMori({ size: 'md' }),
                        {
                          'text-dark-purple': urlIncludes(link.parent),
                          'text-grey-400 border-link': !urlIncludes(
                            link.parent
                          ),
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
                      <span className="text-grey-400">
                        {profile.first_name ?? profile.email}
                      </span>
                    </ConditionalLink>
                    <div className="pointer-events-none absolute top-full right-0 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="bg-beige w-60 rounded-lg p-2.5 shadow-xl">
                        <ConditionalLink href="/">
                          <p
                            className={cn(
                              'mb-4 overflow-hidden text-ellipsis',
                              typePPMori({ size: 'xl' })
                            )}
                          >
                            {profile.first_name ?? profile.email}
                          </p>
                        </ConditionalLink>
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
