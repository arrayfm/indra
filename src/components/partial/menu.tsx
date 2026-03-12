'use client'

import { useEffect, useRef, useState } from 'react'

export const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    const targetNode = event.target as Node

    if (menuButtonRef.current && menuButtonRef.current.contains(targetNode)) {
      return
    }

    if (menuRef.current && !menuRef.current.contains(targetNode)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleMenuButtonClick = () => {
    setMenuOpen((prevState) => !prevState)
  }

  return <div ref={menuRef} className="py-[10px] pl-[10px]"></div>
}
