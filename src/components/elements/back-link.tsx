'use client'

import { ConditionalLink, ConditionalLinkProps } from './conditional-link'
import { useNavigateTransition } from '@/lib/hooks/use-transition'
import { Button } from '../ui/button'
import { popHistory } from '@/lib/utils/page-history'

export const BackLink = ({
  href,
  ...props
}: { href?: string } & Partial<ConditionalLinkProps>) => {
  const { handleBack } = useNavigateTransition()

  const handleHistoryBack = () => {
    const previous = popHistory()
    if (previous) {
      handleBack(undefined, previous)
    } else {
      handleBack(undefined, '')
    }
  }

  if (href) {
    return (
      <ConditionalLink href={href} {...props}>
        <Button className="mb-5 w-fit">Back</Button>
      </ConditionalLink>
    )
  }

  return (
    <Button onClick={handleHistoryBack} className="mb-5 w-fit" {...props}>
      Back
    </Button>
  )
}
