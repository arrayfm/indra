'use client'

import { cn } from '@/lib/utils/class-name'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
import { Media, MuxVideo as MuxVideoProps } from '@/types/elements'
import { getMuxThumbnail, getMuxVideoUrl } from '@/lib/core/mux'
import { useInView } from 'motion/react'

export const MuxVideo = ({ muxVideo }: { muxVideo: MuxVideoProps }) => {
  const { playbackId } = muxVideo
  const videoRef = useRef<HTMLVideoElement>(null)

  const isInView = useInView(videoRef)

  const thumbnailTime = 0

  const playVideo = () => {
    videoRef.current?.play()
  }

  const pauseVideo = () => {
    videoRef.current?.pause()
  }

  useEffect(() => {
    let hls = null
    let videoFailed = false

    if (!playbackId) {
      return
    }

    const src = getMuxVideoUrl(playbackId)

    if (videoRef.current) {
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src
      } else if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(videoRef.current)
      } else {
        videoFailed = true
      }
    }

    if (!videoFailed) playVideo()

    return () => {
      if (hls) hls.destroy()
    }
  }, [playbackId, videoRef])

  useEffect(() => {
    if (isInView) {
      playVideo()
    } else {
      pauseVideo()
    }
  }, [isInView])

  return (
    <>
      {playbackId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getMuxThumbnail({
            playbackId,
            time: thumbnailTime,
            width: 1920,
          })}
          alt="Thumbnail"
          className={cn(
            'pointer-events-none absolute top-0 z-10 h-full w-full object-cover'
          )}
        />
      )}
      <video
        ref={videoRef}
        controls={false}
        className={cn('absolute top-0 left-0 z-20 h-full w-full object-cover')}
        muted
        playsInline
        loop
      />
    </>
  )
}
