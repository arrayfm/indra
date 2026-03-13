'use client'

import { contains, stripBaseUrl } from '@/lib/utils/string'
import { ConditionalLink, ConditionalLinkProps } from './conditional-link'

export const BackLink = ({
  targetPreviousUrl,
  previousUrl,
  children,
  ...props
}: {
  targetPreviousUrl?: string
  previousUrl?: string
  children: React.ReactNode
} & ConditionalLinkProps) => {
  let backUrl: string | null = null

  if (
    typeof document !== 'undefined' &&
    document.referrer.startsWith(window.location.origin)
  ) {
    backUrl = document.referrer
  }

  if (targetPreviousUrl && backUrl && !contains(backUrl, targetPreviousUrl)) {
    backUrl = targetPreviousUrl
  }

  const href = stripBaseUrl(backUrl || previousUrl || targetPreviousUrl || '/')

  return (
    <ConditionalLink href={href} {...props}>
      {children}
    </ConditionalLink>
  )
}
