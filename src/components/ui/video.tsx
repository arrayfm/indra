'use client'

import { useVideoPlaybackQueue } from '@/lib/context/video-playback-queue-context'
import { getAspectRatio } from '@/lib/core/image'
import { cn } from '@/lib/utils/class-name'
import { parseSanityVideoAssetToUrl } from '@/sanity/lib/video'
import { VideoProps } from '@/types/elements'
import {
  useInView,
  useMotionValueEvent,
  MotionValue,
  useMotionValue,
} from 'motion/react'
import { useState, useEffect, forwardRef, useRef } from 'react'

const preloadVideoSize = (src: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    const handler = () =>
      resolve({ width: video.videoWidth, height: video.videoHeight })

    video.onloadedmetadata = handler
    video.src = src

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handler()
    } else {
      video.load()
    }
  })

type VideoWithSizeProps = VideoProps & {
  sizeValue?: MotionValue<number>
  playThresholdPx?: number
}

const Video = forwardRef<HTMLVideoElement, VideoWithSizeProps>(
  (
    {
      video,
      className,
      aspectRatio,
      controls = false,
      muted = true,
      loop = true,
      autoPlay = true,
      transition = true,
      onLoadedData,
      cover = false,
      rounded = false,
      height,
      outputSize,
      sizeValue,
      playThresholdPx,
      ...props
    },
    ref
  ) => {
    const [videoSize, setVideoSize] = useState<{
      width: number
      height: number
    } | null>(null)
    const [loaded, setLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const internalRef = useRef<HTMLVideoElement>(null)
    const { queuePlay } = useVideoPlaybackQueue()
    const [isPaused, setIsPaused] = useState(true)

    const fallbackSize = useMotionValue(0)
    const effectiveSizeValue = sizeValue ?? fallbackSize

    const isSizeGated = sizeValue !== undefined && playThresholdPx !== undefined
    const aboveThresholdRef = useRef(false)

    const isInViewOnce = useInView(containerRef, { once: true, amount: 0.01 })
    const isInViewContinuous = useInView(containerRef, {
      once: false,
      amount: 0,
      margin: '200px',
    })

    const videoSrc = parseSanityVideoAssetToUrl({ video, outputSize })
    const thumbnailUrl = parseSanityVideoAssetToUrl({
      video,
      outputSize: {
        width: outputSize?.width,
        height: outputSize?.height,
        ratio: outputSize?.ratio,
        poster: true,
      },
    })

    useEffect(() => {
      if (!videoSrc) return
      preloadVideoSize(videoSrc).then(setVideoSize)
    }, [videoSrc])

    useEffect(() => {
      const el =
        (ref as React.RefObject<HTMLVideoElement>)?.current ??
        internalRef.current
      if (!el) return
      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setLoaded(true)
      }
    }, [ref, videoSrc])

    const calculatedAspectRatio = getAspectRatio(aspectRatio)
    const videoSrcAspectRatio = videoSize
      ? videoSize.width / videoSize.height
      : null
    const resolvedAspectRatio =
      calculatedAspectRatio ||
      video?.dimensions.aspectRatio ||
      videoSrcAspectRatio ||
      16 / 9

    const videoEl =
      (ref as React.RefObject<HTMLVideoElement>)?.current ?? internalRef.current

    useMotionValueEvent(
      effectiveSizeValue as MotionValue<number>,
      'change',
      (latest) => {
        if (!isSizeGated || !autoPlay) return

        const el =
          (ref as React.RefObject<HTMLVideoElement>)?.current ??
          internalRef.current
        if (!el) return

        const shouldPlay = latest >= playThresholdPx!

        if (shouldPlay && !aboveThresholdRef.current) {
          aboveThresholdRef.current = true
          el.play().catch(() => {
            queuePlay(async () => {
              if (el && aboveThresholdRef.current) {
                await el
                  .play()
                  .catch((err) => console.warn('Video playback failed:', err))
              }
            })
          })
        } else if (!shouldPlay && aboveThresholdRef.current) {
          aboveThresholdRef.current = false
          el.pause()

          el.currentTime = 0
        }
      }
    )

    useEffect(() => {
      if (!videoEl || !autoPlay || isSizeGated) return

      const handlePlayback = async () => {
        if (isInViewContinuous && isPaused) {
          try {
            await videoEl.play()
            setIsPaused(false)
          } catch (error) {
            queuePlay(async () => {
              if (videoEl && isInViewContinuous) {
                try {
                  await videoEl.play()
                  setIsPaused(false)
                } catch (err) {
                  console.warn('Video playback failed:', err)
                }
              }
            })
          }
        } else if (!isInViewContinuous && !isPaused) {
          videoEl.pause()
          setIsPaused(true)
        }
      }

      handlePlayback()
    }, [
      isInViewContinuous,
      autoPlay,
      videoEl,
      isPaused,
      queuePlay,
      isSizeGated,
    ])

    return (
      <div
        ref={containerRef}
        className={cn(className, {
          'relative h-auto max-h-full w-auto max-w-full overflow-hidden transition-all':
            !cover,
          'opacity-100': (isInViewOnce && loaded) || !transition,
          'opacity-0': !isInViewOnce && !loaded && transition,
          'rounded-[30px] md:rounded-[40px] lg:rounded-[60px]': rounded,
        })}
        style={!cover ? { aspectRatio: resolvedAspectRatio } : {}}
      >
        {videoSrc && (
          <video
            ref={ref || internalRef}
            src={videoSrc}
            className={cn('absolute inset-0 h-full w-full object-cover')}
            controls={controls}
            muted={muted}
            loop={loop}
            playsInline
            preload={isSizeGated ? 'metadata' : 'auto'}
            onLoadedData={() => {
              onLoadedData?.()
              setLoaded(true)
            }}
            poster={thumbnailUrl}
            {...props}
          />
        )}
      </div>
    )
  }
)

Video.displayName = 'Video'

export { Video }
