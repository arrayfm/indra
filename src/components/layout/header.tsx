import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { ConditionalLink } from '../elements/conditional-link'

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
              <li>
                <ConditionalLink href="/customer-portal">
                  Account{' '}
                  <span className="text-grey-400">{user?.email ?? 'User'}</span>
                </ConditionalLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
