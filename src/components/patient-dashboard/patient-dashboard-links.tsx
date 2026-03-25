'use client'

import { PATIENT_DASHBOARD_LINKS } from '@/constants'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const PatientDashboardLinks = () => {
  const pathname = usePathname()
  const urlIncludes = (href: string) => pathname?.includes(href)

  return (
    <nav>
      <ul className="flex flex-wrap gap-5 md:flex-col">
        {PATIENT_DASHBOARD_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(typePPMori({ size: 'lg' }), {
                'text-grey-400': !urlIncludes(link.href),
                'text-dark-purple': urlIncludes(link.href),
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
