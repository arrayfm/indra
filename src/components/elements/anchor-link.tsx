'use client'

import useIntersectionObserver from '@/lib/hooks/use-interaction-observer'
import useMediaQuery from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils/class-name'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AnchorLinkProps {
  href: string
  className?: string
  children: React.ReactNode
  [prop: string]: any
}

const getAllIds = (): string[] => {
  const elements = document.querySelectorAll('[id]')
  const ids = Array.from(elements).map((element) => element.id)
  return ids
}

const scrollToPosition = (targetY: number, duration = 1000) => {
  const startY = window.scrollY
  const distanceY = targetY - startY
  const startTime = performance.now()

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const step = (currentTime: number) => {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easedProgress = easeInOutCubic(progress)
    window.scrollTo(0, startY + distanceY * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  const [pageIds, setPageIds] = useState<string[]>([])
  const currentId = href.replace('#', '')
  const { push } = useRouter()
  const isMobile = useMediaQuery(1024, 'max')
  const headerHeight = isMobile ? 90 : 129

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight

        scrollToPosition(targetPosition)

        push(href, { scroll: false })
      }
    }
  }

  const activeId = useIntersectionObserver(pageIds)

  useEffect(() => {
    setPageIds(getAllIds())
  }, [])

  return (
    <a
      href={href}
      className={cn(className, {
        active: activeId === currentId,
      })}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}

export default AnchorLink
