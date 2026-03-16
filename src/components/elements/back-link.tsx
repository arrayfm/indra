'use client'

import { contains, stripBaseUrl } from '@/lib/utils/string'
import { ConditionalLink, ConditionalLinkProps } from './conditional-link'
import { useNavigateTransition } from '@/lib/hooks/use-transition'

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
  const { handleBack } = useNavigateTransition()

  const canGoBack =
    targetPreviousUrl && previousUrl && contains(previousUrl, targetPreviousUrl)

  if (canGoBack) {
    return (
      <ConditionalLink href={stripBaseUrl(previousUrl)} {...props}>
        {children}
      </ConditionalLink>
    )
  }

  return (
    <a href="#" onClick={handleBack} {...props}>
      {children}
    </a>
  )
}
