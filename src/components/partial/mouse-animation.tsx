'use client'

import { cn } from '@/lib/utils/class-name'
import { useEffect, useRef, useState } from 'react'

const IDLE_DELAY = 1000 // time after scroll stops

export const ScrollMoreArrow = () => {
  const [visible, setVisible] = useState(false)
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const hasMoreToScroll = () =>
      window.innerHeight + window.scrollY <
      document.documentElement.scrollHeight - 8

    const handleScroll = () => {
      setVisible(false)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)

      idleTimeoutRef.current = setTimeout(() => {
        if (hasMoreToScroll()) setVisible(true)
      }, IDLE_DELAY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-16 left-1/2 z-50 md:bottom-20 md:left-16">
      <div
        className={cn('relative transition-opacity duration-500 ease-in-out', {
          'opacity-100': visible,
          'opacity-0': !visible,
        })}
      >
        <div className="scroll-downs -translate-x-1/2 md:translate-x-0">
          <div className="mousey">
            <div className="scroller"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
