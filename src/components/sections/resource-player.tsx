'use client'

import { useState } from 'react'
import { Resource } from '@/types/documents'
import { Section } from '../layout/section'
import { Embed } from '../media/embed'
import { Media } from '../media/media'
import { Button } from '../ui/button'
import { SVG } from '../elements/svg'
import { PlaySVG } from '../svg/play'

export const ResourcePlayer = ({ mediaUrlEmbed, audio, media }: Resource) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const hasAudio = !!audio
  const hasVideo = !!mediaUrlEmbed?.url

  const externalControls = mediaUrlEmbed?.url
    ? {
        isPlaying: isPlayingVideo,
        onPlayToggle: () => setIsPlayingVideo((prev) => !prev),
      }
    : undefined

  const handleVideoClick = () => {
    if (!hasVideo) return
    if (isPlayingAudio) {
      setIsPlayingAudio(false)
    }

    setIsPlayingVideo((prev) => !prev)
  }

  const handleAudioClick = () => {
    if (!hasAudio) return
    if (isPlayingVideo) {
      setIsPlayingVideo(false)
    }

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
            <Button onClick={handleAudioClick}>
              {isPlayingAudio ? 'Pause' : 'Play'} audio
              <SVG>
                <PlaySVG />
              </SVG>
            </Button>
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
