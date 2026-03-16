'use client'

import { useState, useEffect, useRef } from 'react'
import { Resource } from '@/types/documents'
import { Section } from '../layout/section'
import { Embed } from '../media/embed'
import { Media } from '../media/media'
import { Button } from '../ui/button'
import { SVG } from '../elements/svg'
import { PlaySVG } from '../svg/play'
import { AudioPlaySVG } from '../svg/audio-play'

export const ResourcePlayer = ({ mediaUrlEmbed, audio, media }: Resource) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
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

    if (isPlayingAudio) setIsPlayingAudio(false)
    setIsPlayingVideo((prev) => !prev)
  }

  const handleAudioClick = () => {
    if (!hasAudio) return

    if (isPlayingVideo) setIsPlayingVideo(false)
    setIsPlayingAudio((prev) => !prev)
  }

  return (
    <Section id="resource-player" className="pt-20">
      <div className="container flex flex-col gap-5">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {media && <Media {...media[0]} cover />}
          <Embed
            {...mediaUrlEmbed}
            hasMedia={!!media}
            externalControls={externalControls}
          />
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2.5">
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
              <SVG>
                <PlaySVG />
              </SVG>
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
