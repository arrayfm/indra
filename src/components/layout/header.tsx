import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { ConditionalLink } from '../elements/conditional-link'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { Button } from '../ui/button'
import { logoutAction } from '@/lib/actions/logout'

type HeaderProps = {
  user: User | null
}

export const Header = ({ user }: HeaderProps) => {
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
                {!user && (
                  <ConditionalLink
                    href="/login"
                    className={cn('border-link', typePPMori({ size: 'md' }))}
                  >
                    Login
                  </ConditionalLink>
                )}
                {user && (
                  <>
                    Account{' '}
                    <span className="text-grey-400">
                      {user?.email ?? 'User'}
                    </span>
                    <div className="pointer-events-none absolute top-full right-0 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="bg-beige w-60 rounded-lg p-2.5 drop-shadow-xl">
                        <p
                          className={cn(
                            'mb-4 overflow-hidden text-ellipsis',
                            typePPMori({ size: 'lg' })
                          )}
                        >
                          {user?.email}
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
                        <Button type="button">Reset password</Button>
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
