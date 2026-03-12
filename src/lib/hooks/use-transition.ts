'use client'

import { MouseEvent, useContext } from 'react'
import { Animation, TransitionContext } from '../context/transition-context'
import { usePathname, useRouter } from 'next/navigation'

export const ANIMATION_DURATION = 700

export function useTransitionContext() {
  const context = useContext(TransitionContext)

  if (!context) {
    throw new Error(
      'You are attempting to use useTransitionContext outside of a TransitionContext.'
    )
  }

  return context
}

export function useTransition() {
  const transitionContext = useContext(TransitionContext)

  if (!transitionContext) {
    throw new Error(
      'You are attempting to use useTransition outside of a TransitionContext.'
    )
  }

  const context = transitionContext

  function fadeOut() {
    return animate('fade-out', context)
  }

  function fadeIn() {
    return animate('fade-in', context)
  }

  function fadeOutIn() {
    return animate('fade-out-in', context)
  }

  function transitionIntoViewport() {
    if (context.animation.current) {
      const animation = getInAnimation(context.animation.current)
      context.setClassName(animation)
    }
  }

  return {
    fadeOutIn,
    fadeOut,
    fadeIn,
    transitionIntoViewport,
  }
}

function getOutAnimation(animation: Animation) {
  switch (animation) {
    case 'fade-in':
      return 'animate-fade-in'
    case 'fade-out':
      return 'animate-fade-out'
    case 'fade-out-in':
      return 'animate-fade-out-in'
    default:
      return 'animate-fade-in'
  }
}

function getInAnimation(animation: Animation) {
  switch (animation) {
    case 'fade-out-in':
      return 'animate-fade-out-in'
    case 'fade-in':
      return 'animate-fade-in'
    case 'fade-out':
      return 'animate-fade-out'
    default:
      return 'animate-fade-out'
  }
}

function animate(animation: Animation, context: TransitionContext) {
  return new Promise((resolve) => {
    const className = getOutAnimation(animation)
    context.setClassName(className)
    context.animation.current = animation

    setTimeout(resolve, ANIMATION_DURATION)
  })
}

export const useNavigateTransition = () => {
  const router = useRouter()
  const pathname = usePathname()

  const transitions = useTransition()
  const { setPageReady } = useTransitionContext()

  const handleNavigation = async (event: MouseEvent, href: string) => {
    if (event.metaKey || event.ctrlKey) return

    if (href === pathname) return

    event.preventDefault()

    setPageReady(false)
    await transitions.fadeIn()

    router.push(href)
  }

  return {
    handleNavigation,
  }
}
