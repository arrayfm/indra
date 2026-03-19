'use client'

import { Resource } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { Media } from '../media/media'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Button } from '../ui/button'
import { PlayFilledSVG } from '../svg/play-filled'
import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle } from 'react-icons/fa'
import { AudioPlaySVG } from '../svg/audio-play'
import { AnimatedComponent } from '../layout/animated-component'

export const ScatterCard = ({
  _id,
  path,
  media,
  title,
  audio,
  mediaUrlEmbed,
}: Resource) => {
  const isAudioOnly = !!audio && !mediaUrlEmbed?.url

  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlayingAudio) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlayingAudio])

  return (
    <div key={_id} className={cn('group flex flex-col gap-5')}>
      {media?.[0] && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.275 }}
          className="flex max-h-120 items-center justify-center overflow-hidden rounded-xl"
        >
          <Media {...media?.[0]} transition={false} />
        </AnimatedComponent>
      )}
      <AnimatedComponent
        as="h2"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.375 }}
        className="flex flex-row items-center justify-between gap-5"
      >
        {title && (
          <ConditionalLink key={_id} href={path} className="flex-1">
            <h2 className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
              {title}
            </h2>
          </ConditionalLink>
        )}
        {!isAudioOnly && (
          <ConditionalLink key={_id} href={path}>
            <Button className={cn('w-fit')}>Get started</Button>
          </ConditionalLink>
        )}

        {isAudioOnly && (
          <div className="flex items-center gap-5">
            <AudioPlaySVG
              isPlaying={isPlayingAudio}
              linesOnly
              numberOfLines={30}
            />
            <button
              className={cn('svg h-8 w-8 cursor-pointer')}
              onClick={(e) => {
                e.preventDefault()
                setIsPlayingAudio(!isPlayingAudio)
              }}
            >
              {isPlayingAudio ? <FaPauseCircle /> : <PlayFilledSVG />}
            </button>
            <audio ref={audioRef} src={audio?.url} className="hidden" />
          </div>
        )}
      </AnimatedComponent>
    </div>
  )
}
