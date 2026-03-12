'use client'

import { ReactLenis, useLenis } from 'lenis/react'

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  //   const lenis = useLenis(({ scroll }) => {})
  return <ReactLenis root>{children}</ReactLenis>
}
