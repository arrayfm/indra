'use client'

import { useState, useEffect, useRef } from 'react'
import { Resource } from '@/types/documents'
import { Section } from '../layout/section'
import { Embed } from './embed'
import { Media } from './media'
import { Button } from '../ui/button'
import { SVG } from '../elements/svg'
import { PlaySVG } from '../svg/play'
import { AudioPlaySVG } from '../svg/audio-play'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { PauseIcon } from '@radix-ui/react-icons'

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
  const [length, setLength] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const hasAudio = !!audio
  const hasVideo = !!mediaUrlEmbed?.url

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
        onPlayToggle: () => setIsPlayingVideo((prev) => !prev),
      }
    : undefined

  const handleVideoClick = () => {
    if (!hasVideo) return

    // if (isPlayingAudio) setIsPlayingAudio(false)
    setIsPlayingVideo((prev) => !prev)
  }

  const handleAudioClick = () => {
    if (!hasAudio) return

    // if (isPlayingVideo) setIsPlayingVideo(false)
    setIsPlayingAudio((prev) => !prev)
  }

  useEffect(() => {
    const getDuration = async () => {
      try {
        if (mediaUrlEmbed?.url) {
          const res = await fetch(
            `https://noembed.com/embed?url=${encodeURIComponent(
              mediaUrlEmbed.url
            )}`
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
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {media && <Media {...media[0]} cover />}
          <Embed
            {...mediaUrlEmbed}
            hasMedia={!!media}
            externalControls={externalControls}
          />
        </div>
      )}

      <div className="flex flex-col justify-between gap-2.5 md:flex-row">
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
          {hasAudio && (
            <>
              <Button onClick={handleAudioClick}>
                {isPlayingAudio ? 'Pause' : 'Play'} audio
                <SVG>
                  <AudioPlaySVG isPlaying={isPlayingAudio} />
                </SVG>
              </Button>
              <audio ref={audioRef} src={audio?.url} className="hidden" />
            </>
          )}
          {hasVideo && (
            <Button onClick={handleVideoClick}>
              {isPlayingVideo ? 'Pause' : 'Play'} video
              <SVG>{isPlayingVideo ? <PauseIcon /> : <PlaySVG />}</SVG>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
