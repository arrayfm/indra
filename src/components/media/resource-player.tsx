'use client'

import { useState, useEffect, useRef } from 'react'
import { Resource } from '@/types/documents'
import { Embed } from './embed'
import { Media } from './media'
import { Button } from '../ui/button'
import { SVG } from '../elements/svg'
import { PlaySVG } from '../svg/play'
import { AudioPlaySVG } from '../svg/audio-play'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { PauseIcon } from '@radix-ui/react-icons'
import { AnimatedComponent } from '../layout/animated-component'

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}m ${secs}s`
}

export const ResourcePlayer = ({
  mediaUrlEmbed,
  audio,
  media,
  subtitle,
}: Resource) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isAudioMode, setIsAudioMode] = useState(false)
  const [length, setLength] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const hasAudio = !!audio
  const hasVideo = !!mediaUrlEmbed?.url
  const showAudioButton = hasAudio || hasVideo

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlayingAudio) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlayingAudio])

  const externalControls = hasVideo
    ? {
        isPlaying: isPlayingVideo,
        isAudioMode,
        onPlayToggle: () => setIsPlayingVideo((prev) => !prev),
      }
    : undefined

  const handleVideoClick = () => {
    if (!hasVideo) return

    if (isAudioMode) {
      setIsAudioMode(false)
    } else {
      setIsPlayingVideo((prev) => !prev)
    }
  }

  const handleAudioClick = () => {
    if (hasAudio) {
      setIsPlayingAudio((prev) => !prev)
    } else if (hasVideo) {
      if (isAudioMode) {
        setIsAudioMode(false)
        setIsPlayingVideo(false)
      } else {
        setIsAudioMode(true)
        setIsPlayingVideo(true)
      }
    }
  }

  const isAudioPlaying = hasAudio ? isPlayingAudio : isAudioMode

  useEffect(() => {
    const getDuration = async () => {
      try {
        if (mediaUrlEmbed?.url) {
          const res = await fetch(
            `https://noembed.com/embed?url=${encodeURIComponent(mediaUrlEmbed.url)}`
          )
          const data = await res.json()
          if (data?.duration) {
            setLength(formatDuration(data.duration))
            return
          }
        }

        if (audioRef.current) {
          const audio = audioRef.current
          const handleLoadedMetadata = () => {
            setLength(formatDuration(audio.duration))
          }
          audio.addEventListener('loadedmetadata', handleLoadedMetadata)
          return () =>
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
      } catch (err) {
        console.error('Failed to fetch media duration', err)
      }
    }

    getDuration()
  }, [mediaUrlEmbed?.url])

  return (
    <div className="flex flex-col gap-5">
      {(media || hasVideo) && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.3 }}
          className="relative aspect-video overflow-hidden rounded-xl"
        >
          {media && <Media {...media[0]} cover transition={false} />}
          <Embed
            {...mediaUrlEmbed}
            hasMedia={!!media}
            externalControls={externalControls}
          />
        </AnimatedComponent>
      )}

      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.4 }}
        className="flex flex-col justify-between gap-2.5 md:flex-row"
      >
        <div className="flex flex-col gap-2.5">
          {subtitle && (
            <p className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
              {subtitle}
            </p>
          )}
          <p className={cn('text-grey-400', typePPMori({ size: 'md' }))}>
            {length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {showAudioButton && (
            <>
              <Button onClick={handleAudioClick} className="relative">
                {isAudioPlaying ? 'Pause' : 'Play'} audio
                <SVG>
                  <AudioPlaySVG isPlaying={isAudioPlaying} />
                </SVG>
              </Button>
              {hasAudio && (
                <audio ref={audioRef} src={audio?.url} className="hidden" />
              )}
            </>
          )}
          {hasVideo && (
            <Button onClick={handleVideoClick}>
              {isPlayingVideo && !isAudioMode ? 'Pause' : 'Play'} video
              <SVG>
                {isPlayingVideo && !isAudioMode ? <PauseIcon /> : <PlaySVG />}
              </SVG>
            </Button>
          )}
        </div>
      </AnimatedComponent>
    </div>
  )
}
