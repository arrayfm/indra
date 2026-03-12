'use client'

import React, { useState, useRef, useEffect } from 'react'

import { Animation, TransitionContext } from '@/lib/context/transition-context'
import { usePathname } from 'next/navigation'
import { useTransition, useTransitionContext } from '@/lib/hooks/use-transition'
import { cn } from '@/lib/utils/class-name'
import { cva, VariantProps } from 'class-variance-authority'
import { useLenis } from 'lenis/react'

export const transitionVariants = cva(
  'animation-fill-mode-forwards pointer-events-none fixed top-0 left-0 z-50 h-screen w-full transition-colors duration-700',
  {
    variants: {
      backgroundTheme: {
        transparent: 'bg-transparent',
        'deep-blue': 'bg-deep-blue',
        'grey-200': 'bg-grey-200',
        'grey-500': 'bg-grey-500',
      },
    },
    defaultVariants: {
      backgroundTheme: 'grey-200',
    },
  }
)

export function TransitionProvider({
  children,
  containerClassName,
}: React.PropsWithChildren<{
  containerClassName?: string
}>) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const lenis = useLenis()

  const [className, setClassName] = useState('animate-fade-out')
  const [headerVisible, setHeaderVisible] = useState(isHome ? false : true)
  const [pageReady, setPageReady] = useState(isHome ? false : true)
  const [backgroundTheme, setBackgroundTheme] = useState<
    VariantProps<typeof transitionVariants>['backgroundTheme'] | undefined
  >(undefined)

  useEffect(() => {
    if (!lenis) return

    if (!pageReady) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [lenis, pageReady])

  const animation = useRef<Animation>('fade-out')

  return (
    <TransitionContext.Provider
      value={{
        className,
        setClassName,
        backgroundTheme,
        setBackgroundTheme,
        headerVisible,
        setHeaderVisible,
        animation,
        pageReady,
        setPageReady,
      }}
    >
      <TransitionContextHandler>
        <>
          {children}

          <div
            className={cn(
              className,
              containerClassName,
              transitionVariants({ backgroundTheme })
            )}
          />
        </>
      </TransitionContextHandler>
    </TransitionContext.Provider>
  )
}

const TransitionContextHandler = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const { setPageReady } = useTransitionContext()
  const transitions = useTransition()

  useEffect(() => {
    window.scrollTo(0, 0)

    const hasPlayed = sessionStorage.getItem('heroPlayed')
    transitions.fadeOut()

    if (!hasPlayed) return

    setPageReady(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <>{children}</>
}
