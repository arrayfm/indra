import { Menu as MenuProps } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'

type HeaderProps = {
  menu: MenuProps
}

export const Header = ({ menu }: HeaderProps) => {
  return (
    <header>
      <div className="container">
        <div className="grid grid-cols-12 py-4">
          <div className="col-span-6">Base Sanity App</div>
          <nav className="col-span-6">
            <ul className="flex justify-between">
              {menu?.items.map((item, index) => (
                <li key={index}>
                  <ConditionalLink href={item.href}>
                    {item.label}
                  </ConditionalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
