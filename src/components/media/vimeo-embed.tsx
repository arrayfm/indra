'use client'

import { cn } from '@/lib/utils/class-name'
import Player from '@vimeo/player'

import { useRef, useEffect, useState } from 'react'
import { VideoEmbedControls } from './video-embed-controls'
import { Embed } from '@/types/elements'

export const VimeoEmbed = ({
  playbackId,
  autoplay = true,
  controls = false,
  hasMedia = false,
}: Embed) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<any | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [loaded, setLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isClicked, setIsClicked] = useState(autoplay)
  const [playerTime, setPlayerTime] = useState({
    played: 0,
    duration: 0,
  })

  const updateDimensions = () => {
    if (iframeRef.current && iframeRef.current.parentElement) {
      const { width, height } =
        iframeRef.current.parentElement.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }

  const handlePlay = () => {
    if (!playerRef.current) return
    if (!isClicked) setIsClicked(true)

    if (isPlaying) {
      playerRef.current.pause()
      setIsPlaying(false)
    } else {
      playerRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleMuteButtonClick = () => {
    if (!playerRef.current) return

    if (!isMuted) {
      playerRef.current.setVolume(0)
      setIsMuted(true)
    } else {
      playerRef.current.setVolume(1)
      setIsMuted(false)
    }
  }

  const handleProgressBarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!playerRef.current) return

    const { width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left
    const percentage = x / width

    playerRef.current.setCurrentTime(playerTime.duration * percentage)
  }

  useEffect(() => {
    updateDimensions()

    window.addEventListener('resize', updateDimensions)

    if (!iframeRef.current || playerRef.current) return

    const parsedPlaybackId = parseInt(playbackId || '')

    if (!parsedPlaybackId) return

    playerRef.current = new Player(iframeRef.current, {
      id: parsedPlaybackId,
      background: true,
      autoplay: autoplay,
      loop: true,
      controls: false,
      muted: true,
    })

    if (!autoplay && !loaded) {
      playerRef.current.pause()
      setIsPlaying(false)
    } else {
      playerRef.current.play()
      setIsPlaying(true)
    }

    playerRef.current.on('playing', () => {
      setLoaded(true)
    })

    return () => {
      window.removeEventListener('resize', updateDimensions)

      if (playerRef.current) {
        if (loaded) playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [playbackId, iframeRef, playerRef, loaded, autoplay])

  useEffect(() => {
    if (!playerRef.current) return

    const interval = setInterval(async () => {
      const played = await playerRef.current.getCurrentTime()
      const duration = await playerRef.current.getDuration()

      setPlayerTime({ played, duration })
    }, 500)

    return () => clearInterval(interval)
  }, [playerRef, isPlaying])

  if (!playbackId) return null

  return (
    <>
      <iframe
        ref={iframeRef} // Attach the ref to the iframe element
        src={`https://player.vimeo.com/video/${playbackId}?background=1`}
        className={cn(
          'absolute top-0 left-0 z-20 h-full w-full object-cover object-center transition-opacity duration-300',
          {
            'opacity-0': hasMedia && !isClicked,
            'opacity-100': !!isClicked || autoplay,
          }
        )}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo video"
      />
      <VideoEmbedControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        playerTime={playerTime}
        embedVisible={isClicked && controls}
        playButtonVisible={!isClicked}
        handlePlay={handlePlay}
        handleProgressBarClick={handleProgressBarClick}
        handleMuteButtonClick={handleMuteButtonClick}
      />
    </>
  )
}
