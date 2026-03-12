'use client'

import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export const useScreenHeight = () => {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return height
}
