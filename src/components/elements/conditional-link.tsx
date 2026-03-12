import Link from 'next/link'
import AnchorLink from '@/components/elements/anchor-link'
import { TransitionLink } from './transition-link'
import { INTERCEPTION_ROUTES } from '@/lib/core/variables'

export type ConditionalLinkProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  [prop: string]: any
}

export const ConditionalLink = ({
  href,
  children,
  className,
  as,
  file,
  ...props
}: ConditionalLinkProps) => {
  if (!href) {
    const Component = as || 'div'
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  href = href.toString()

  const isExternalLink = href.startsWith('http') || props.target === '_blank'
  const isAnchorLink = href.startsWith('#')
  const isQueryLink = href.startsWith('?')
  const isMailtoLink = href.startsWith('mailto:')
  const isTelLink = href.startsWith('tel:')
  const isInterceptedRoute = INTERCEPTION_ROUTES.includes(href)

  if (isExternalLink) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <AnchorLink href={href} className={className} {...props}>
        {children}
      </AnchorLink>
    )
  }

  if (isMailtoLink || isTelLink || isInterceptedRoute) {
    return (
      <Link href={href} className={className} {...props} scroll={false}>
        {children}
      </Link>
    )
  }

  return (
    <TransitionLink
      href={href}
      className={className}
      scroll={isQueryLink ? false : props.scroll || true}
      {...props}
    >
      {children}
    </TransitionLink>
  )
}
