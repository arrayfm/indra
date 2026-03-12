'use client'

import { cn } from '@/lib/utils/class-name'
import { checkPlayerTimeValues, getMuxVideoUrl } from '@/lib/core/mux'
import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'
import { MuxVideo } from '@/types/elements'
import { VideoEmbedControls } from './video-embed-controls'
import { useInView } from 'motion/react'

export type MuxEmbedProps = {
  muxVideo: MuxVideo
}

export const MuxEmbed = ({ muxVideo }: MuxEmbedProps) => {
  const { playbackId } = muxVideo
  const src = getMuxVideoUrl(playbackId)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [playerTime, setPlayerTime] = useState({ played: 0, duration: 0 })
  const [embedVisible, setEmbedVisible] = useState(false)

  const isInView = useInView(videoRef)

  const playVideo = () => videoRef.current && videoRef.current.play()
  const pauseVideo = () => videoRef.current && videoRef.current.pause()

  const onVideoPlay = () => setIsPlaying(true)
  const onVideoPause = () => setIsPlaying(false)
  const onVideoReady = () => setIsReady(true)

  const handlePlay = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    if (!embedVisible) setEmbedVisible(true)

    if (isPlaying) {
      pauseVideo()
    } else {
      playVideo()
    }
  }

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const progressBarRect = event.currentTarget.getBoundingClientRect()
    const clickOffsetX = event.clientX - progressBarRect.left
    const clickPercentage =
      clickOffsetX / (progressBarRect.right - progressBarRect.left)

    if (videoRef.current) {
      const videoDuration = playerTime.duration
      videoRef.current.currentTime = clickPercentage * videoDuration
    }
  }

  const handleMuteButtonClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    setIsMuted(!isMuted)
  }

  useEffect(() => {
    let hls = null
    let videoFailed = false

    if (!playbackId || !videoRef.current) return

    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src
    } else if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
    } else {
      videoFailed = true
    }

    const currentVideoRef = videoRef.current

    if (!videoFailed) {
      currentVideoRef.addEventListener('play', onVideoPlay)
      currentVideoRef.addEventListener('pause', onVideoPause)
      if (currentVideoRef?.readyState === 4) {
        onVideoReady()
      } else {
        currentVideoRef.addEventListener('canplay', onVideoReady)
      }
    }

    return () => {
      currentVideoRef?.removeEventListener('play', onVideoPlay)
      currentVideoRef?.removeEventListener('pause', onVideoPause)
      currentVideoRef?.removeEventListener('canplay', onVideoReady)

      if (hls) hls.destroy()
    }
  }, [playbackId, src])

  useEffect(() => {
    if (!isPlaying || !videoRef.current) {
      return
    }

    const duration = videoRef.current.duration

    const interval = setInterval(() => {
      if (!videoRef.current) return
      const played = videoRef.current.currentTime

      setPlayerTime(checkPlayerTimeValues({ played, duration: duration }))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!embedVisible) return
    if (!isInView) {
      pauseVideo()
    }
  }, [embedVisible, isInView])

  return (
    <>
      <video
        ref={videoRef}
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-full object-cover',
          'transition-all duration-500',
          {
            'opacity-0': !embedVisible,
            'opacity-100': embedVisible,
          }
        )}
        muted={!!isMuted}
        playsInline
      />
      <VideoEmbedControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        playerTime={playerTime}
        embedVisible={embedVisible}
        playButtonVisible={!isPlaying && !embedVisible}
        handlePlay={handlePlay}
        handleProgressBarClick={handleProgressBarClick}
        handleMuteButtonClick={handleMuteButtonClick}
      />
    </>
  )
}
