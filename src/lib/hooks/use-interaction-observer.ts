'use client'

import { useState, useEffect } from 'react'

const useIntersectionObserver = (ids: string[], options = {}) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [ids, options])

  return activeId
}

export default useIntersectionObserver
