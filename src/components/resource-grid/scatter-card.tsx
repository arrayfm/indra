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

export const ScatterCard = ({
  _id,
  path,
  media,
  title,
  audio,
  mediaUrlEmbed,
}: Resource) => {
  const isAudioOnly = !!audio && !mediaUrlEmbed

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
        <div className="flex max-h-120 items-center justify-center overflow-hidden rounded-xl">
          <Media {...media?.[0]} />
        </div>
      )}
      <div className="flex flex-row items-center justify-between gap-5">
        {title && (
          <h2
            className={cn(typePPMori({ size: 'md', weight: 'semibold' }), {
              'w-1/2': isAudioOnly,
            })}
          >
            {title}
          </h2>
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
      </div>
    </div>
  )
}
