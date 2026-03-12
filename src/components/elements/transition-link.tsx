'use client'

import { useEffect, useState } from 'react'

import { useNavigateTransition } from '@/lib/hooks/use-transition'
import { ConditionalLinkProps } from './conditional-link'
import { cn } from '@/lib/utils/class-name'

export const TransitionLink = ({
  href,
  className,
  scroll,
  children,
  ...props
}: ConditionalLinkProps) => {
  const [hydrated, setHydrated] = useState(false)
  const { handleNavigation } = useNavigateTransition()

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  return (
    <a
      className={cn('cursor-pointer', className)}
      onClick={(event) => handleNavigation(event, href)}
      href={href}
      {...props}
    >
      {children}
    </a>
  )
}
