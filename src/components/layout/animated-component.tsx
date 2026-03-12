'use client'

import { useTransitionContext } from '@/lib/hooks/use-transition'
import { cn } from '@/lib/utils/class-name'

import {
  useAnimate,
  useInView,
  UseInViewOptions,
  ValueAnimationTransition,
} from 'motion/react'
import { ElementType, useEffect } from 'react'

export interface AnimatedComponentProps extends React.ComponentProps<'div'> {
  as?: ElementType
  transitionOptions?: ValueAnimationTransition
  useInViewOptions?: UseInViewOptions
}

function AnimatedComponent({
  as: Comp = 'div',
  className,
  children,
  transitionOptions,
  useInViewOptions,
  ...props
}: AnimatedComponentProps & React.ComponentProps<'div'>) {
  const transition = {
    ...{ delay: 0.125, duration: 0.5 },
    ...transitionOptions,
  }
  const inViewOptions = { ...{ once: true, amount: 0.15 }, ...useInViewOptions }

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, inViewOptions)
  const { pageReady } = useTransitionContext()

  useEffect(() => {
    if (!isInView || !pageReady) return

    animate(
      scope.current,
      {
        transform: 'translateY(0)',
        opacity: 1,
      },
      transition
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, pageReady])

  return (
    <Comp
      ref={scope}
      className={cn('ease-[cubic-bezier(0.33, 1, 0.68, 1)]', className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { AnimatedComponent }
