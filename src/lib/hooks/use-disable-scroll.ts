'use client'

import { useEffect } from 'react'

export default function useDisableScroll(disabled: boolean) {
  useEffect(() => {
    const body = document.body
    const header = document.querySelector('header')
    const contentLargerThanViewport =
      document.documentElement.scrollHeight > window.innerHeight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    if (disabled) {
      body.style.overflow = 'hidden'
      body.style.paddingRight = `${scrollbarWidth}px`
      if (header && contentLargerThanViewport) {
        header.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      body.style.overflow = ''
      body.style.paddingRight = ''
      if (header && contentLargerThanViewport) {
        header.style.paddingRight = ''
      }
    }

    return () => {
      body.style.overflow = ''
      body.style.paddingRight = ''
    }
  }, [disabled])
}
