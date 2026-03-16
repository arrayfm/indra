'use client'

import { cn } from '@/lib/utils/class-name'

import { useRef, useEffect, useState } from 'react'
import { VideoEmbedControls } from '@/components/media/video-embed-controls'
import Script from 'next/script'
import { Embed } from '@/types/elements'

export const YoutubeEmbed = ({
  playbackId,
  autoplay = true,
  controls = false,
  hasMedia = false,
}: Embed) => {
  const playerRef = useRef<HTMLDivElement | null>(null)
  const [player, setPlayer] = useState<any | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isClicked, setIsClicked] = useState(autoplay)
  const [playerTime, setPlayerTime] = useState({
    played: 0,
    duration: 0,
  })

  const handlePlay = () => {
    if (!player) return
    if (!isClicked) setIsClicked(true)

    const playerState = player.getPlayerState()
    if (playerState === window.YT.PlayerState.PLAYING) {
      player.pauseVideo()
      setIsPlaying(false)
    } else {
      player.playVideo()
      setIsPlaying(true)
    }
  }

  const handleMuteButtonClick = () => {
    if (!player) return

    if (!isMuted) {
      player.mute()
      setIsMuted(true)
    } else {
      player.unMute()
      setIsMuted(false)
    }
  }

  const handleProgressBarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!player) return

    const { width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left
    const percentage = x / width

    player.seekTo(playerTime.duration * percentage)
  }

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        const playerInstance = new window.YT.Player(playerRef.current, {
          videoId: playbackId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            autohide: 1,
            iv_load_policy: 3,
          },
          events: {
            onReady: () => {
              setPlayer(playerInstance)
            },
          },
        })
      }
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    }
  }, [playbackId, playerRef, autoplay, player])

  useEffect(() => {
    if (!player) return

    const interval = setInterval(async () => {
      const played = await player.getCurrentTime()
      const duration = await player.getDuration()

      setPlayerTime({ played, duration })
    }, 500)

    return () => clearInterval(interval)
  }, [player])

  if (!playbackId) return null

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="lazyOnload" // Load the script after the page has been loaded
      />

      <div
        className={cn(
          'absolute top-0 left-0 z-20 h-full w-full object-cover object-center transition-opacity duration-300',
          {
            'opacity-0': hasMedia && !isClicked,
            'opacity-100': !!isClicked || autoplay,
          }
        )}
      >
        <div
          ref={playerRef} // Attach the ref to the iframe element
          className={cn(
            'absolute top-0 left-0 z-20 h-full w-full object-cover object-center'
          )}
        />
      </div>
      <VideoEmbedControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        playerTime={playerTime}
        playButtonVisible={!isClicked}
        embedVisible={isClicked && controls}
        handlePlay={handlePlay}
        handleProgressBarClick={handleProgressBarClick}
        handleMuteButtonClick={handleMuteButtonClick}
      />
    </>
  )
}
