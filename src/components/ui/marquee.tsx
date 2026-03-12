'use client'

import useMediaQuery from '@/lib/hooks/use-media-query'
import { useEffect, useRef, useState } from 'react'
import { AnimatedComponent } from '@/components/layout/animated-component'
import { cn } from '@/lib/utils/class-name'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  gap?: number
  className?: string
  direction?: 'left' | 'right'
}

export function Marquee({
  children,
  speed = 20,
  gap = 48,
  direction = 'left',
  className,
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [scrollSpeed, setScrollSpeed] = useState(speed)
  const isMobile = useMediaQuery(1024, 'max')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!children) return

    const marqueeElement = marqueeRef.current
    if (!marqueeElement || !marqueeElement.parentElement) return

    const adjustedSpeed = isMobile ? speed / 1.5 : speed

    setScrollSpeed(adjustedSpeed)
  }, [children, isMobile, speed])

  if (!children) return null

  return (
    <AnimatedComponent
      style={{ opacity: 0 }}
      className={cn('relative flex h-full w-full overflow-hidden', className)}
    >
      {[0, 1, 2].map((_, i) => (
        <div
          key={i}
          ref={i === 0 ? marqueeRef : undefined}
          className="inline-flex h-full min-w-max items-center"
          style={{
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
            ...(ready && {
              animation: `translate-${direction} ${scrollSpeed}s linear infinite`,
            }),
          }}
        >
          {children}
        </div>
      ))}
    </AnimatedComponent>
  )
}
