'use client'

import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PATIENT_HISTORY_LINKS = [
  { label: 'Appointments', href: '/patient-history/appointments' },
  { label: 'Prescriptions', href: '/patient-history/prescriptions' },
]

export const PatientHistoryLinks = () => {
  const pathname = usePathname()
  const urlIncludes = (href: string) => pathname?.includes(href)

  return (
    <nav>
      <ul className="flex flex-col gap-8">
        {PATIENT_HISTORY_LINKS.map((link) => (
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
