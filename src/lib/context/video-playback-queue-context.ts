'use client'

import { createContext, useContext } from 'react'

interface VideoPlaybackQueueContextType {
  queuePlay: (playFn: () => Promise<void> | void) => void
}

export const VideoPlaybackQueueContext =
  createContext<VideoPlaybackQueueContextType | null>(null)

export const useVideoPlaybackQueue = () => {
  const context = useContext(VideoPlaybackQueueContext)
  if (!context)
    throw new Error(
      'useVideoPlaybackQueue must be used within VideoPlaybackQueueProvider'
    )
  return context
}
