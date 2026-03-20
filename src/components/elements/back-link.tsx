'use client'

import { contains, stripBaseUrl } from '@/lib/utils/string'
import { ConditionalLink, ConditionalLinkProps } from './conditional-link'
import { useNavigateTransition } from '@/lib/hooks/use-transition'
import { Button } from '../ui/button'

export const BackLink = ({
  targetPreviousUrl,
  previousUrl,
  ...props
}: {
  targetPreviousUrl?: string
  previousUrl?: string
} & Partial<ConditionalLinkProps>) => {
  const { handleBack } = useNavigateTransition()

  const canGoBack =
    targetPreviousUrl && previousUrl && contains(previousUrl, targetPreviousUrl)

  if (canGoBack) {
    return (
      <ConditionalLink href={stripBaseUrl(previousUrl)} {...props}>
        <Button className="mb-5 w-fit" {...props}>
          Back
        </Button>
      </ConditionalLink>
    )
  }

  return (
    <Button onClick={handleBack} className="mb-5 w-fit" {...props}>
      Back
    </Button>
  )
}
