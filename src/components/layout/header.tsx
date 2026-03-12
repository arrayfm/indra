import Image from 'next/image'
import { ConditionalLink } from '../elements/conditional-link'

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="flex items-center justify-between py-2.5">
          <div>
            <Image
              src="/images/indra-logo-purple.png"
              alt="Indra logo"
              width={70}
              height={38}
            />
          </div>
          <nav>
            <ul>
              <li>
                <ConditionalLink href="/customer-portal">
                  Account <span className="text-grey-400">User</span>
                </ConditionalLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
