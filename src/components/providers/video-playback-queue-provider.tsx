'use client'

import { VideoPlaybackQueueContext } from '@/lib/context/video-playback-queue-context'
import { useRef, useCallback } from 'react'

export const VideoPlaybackQueueProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const queueRef = useRef<Array<() => Promise<void> | void>>([])
  const isProcessingRef = useRef(false)
  const lastPlayTimeRef = useRef(0)

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0) return

    isProcessingRef.current = true

    while (queueRef.current.length > 0) {
      const playFn = queueRef.current.shift()
      if (!playFn) continue

      const timeSinceLastPlay = Date.now() - lastPlayTimeRef.current
      const delay = Math.max(0, 20 - timeSinceLastPlay)

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      try {
        await playFn()
      } catch (e) {}

      lastPlayTimeRef.current = Date.now()
    }

    isProcessingRef.current = false
  }, [])

  const queuePlay = useCallback(
    (playFn: () => Promise<void> | void) => {
      queueRef.current.push(playFn)
      processQueue()
    },
    [processQueue]
  )

  return (
    <VideoPlaybackQueueContext.Provider value={{ queuePlay }}>
      {children}
    </VideoPlaybackQueueContext.Provider>
  )
}
