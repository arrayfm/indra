'use client'

export const scrollToSection = (id: string, headerHeight = 129) => {
  const targetElement = document.getElementById(id)

  if (!targetElement) return

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

  const startY = window.scrollY
  const distanceY = targetPosition - startY
  const duration = 1000
  const startTime = performance.now()

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const step = (currentTime: number) => {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easedProgress = easeInOutCubic(progress)
    window.scrollTo(0, startY + distanceY * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
