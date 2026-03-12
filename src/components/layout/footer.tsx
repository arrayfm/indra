import { Menu as MenuProps } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'

type FooterProps = {
  menu: MenuProps
}

export const Footer = ({ menu }: FooterProps) => {
  return (
    <footer>
      <div className="container">
        <div className="grid grid-cols-12 py-4">
          <div className="col-span-6">Footer</div>
          <nav className="col-span-6">
            <ul className="flex items-end justify-end gap-5">
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
    </footer>
  )
}
