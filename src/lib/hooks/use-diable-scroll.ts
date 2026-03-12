'use client'

import { useEffect } from 'react'

export default function useDisableScroll(disabled: boolean) {
  useEffect(() => {
    const body = document.body
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    if (disabled) {
      body.style.overflow = 'hidden'
      body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      body.style.overflow = ''
      body.style.paddingRight = ''
    }

    return () => {
      body.style.overflow = ''
      body.style.paddingRight = ''
    }
  }, [disabled])
}
