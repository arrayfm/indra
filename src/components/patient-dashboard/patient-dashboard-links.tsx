'use client'

import { PATIENT_DASHBOARD_LINKS } from '@/constants'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SelectInput } from '../ui/select-input'

export const PatientDashboardLinks = () => {
  const pathname = usePathname()
  const router = useRouter()
  const urlIncludes = (href: string) => pathname?.includes(href)

  const navOptions = PATIENT_DASHBOARD_LINKS.map((link) => ({
    value: link.href,
    label: link.label,
  }))

  const currentOption = navOptions.find((opt) => urlIncludes(opt.value))

  const handleSelect = (option: { value: string; label: string }) => {
    router.push(option.value)
  }

  return (
    <nav>
      <div className="md:hidden">
        <SelectInput
          options={navOptions}
          inputName="patient-dashboard-nav"
          placeholder={currentOption?.label ?? 'Navigate to...'}
          onSelect={handleSelect}
        />
      </div>

      {/* Desktop: link list */}
      <ul className="hidden md:flex md:flex-col md:gap-5">
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
