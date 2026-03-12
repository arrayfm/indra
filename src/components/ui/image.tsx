'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView, motion } from 'motion/react'
import {
  getAspectRatio,
  getCroppedAspectRatio,
  getSanityImageAspectRatio,
} from '@/lib/core/image'
import { ImageProps } from '@/types/elements'
import { cn } from '@/lib/utils/class-name'
import { parseSanityImageAssetToUrl } from '@/sanity/lib/image'

function Image({
  image,
  alt,
  src,
  aspectRatio,
  className,
  transition = true,
  rounded = false,
  sanityImageOptions,
  ...props
}: ImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  })
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null)

  const handleImageLoad = useCallback(() => {
    setShowThumbnail((prev) => (prev ? false : prev))
    setLoaded(true)
  }, [])

  const handleThumbnailLoad = useCallback(() => {
    setThumbnailLoaded(true)
  }, [])

  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  } | null>({
    width: 1280,
    height: 720,
  })
  const [captionHeight, setCaptionHeight] = useState<number>(0)

  const imageUrl =
    parseSanityImageAssetToUrl({
      source: image,
      options: sanityImageOptions,
    }) || src
  const thumbnailUrl = parseSanityImageAssetToUrl({
    source: image,
    options: { width: 100, quality: 10, format: 'webp', fit: 'crop' },
  })
  const calculatedAspectRatio = getAspectRatio(aspectRatio)
  const sanityImageRatio = getSanityImageAspectRatio(
    image?.metadata?.dimensions?.aspectRatio
  )
  const imageSrcAspectRatio = getAspectRatio(
    imageSize && imageSize?.height / imageSize?.width
  )
  const croppedAspectRatio = getCroppedAspectRatio(image)
  const imageAlt = image?.alt || alt || 'image'

  useEffect(() => {
    if (!src || aspectRatio) return

    const img = new window.Image()
    img.src = src.toString()

    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
    }
  }, [src, aspectRatio])

  useEffect(() => {
    if (!image?.caption) return

    const captionHeight = captionRef.current?.clientHeight || 0
    setCaptionHeight(captionHeight)
  }, [image?.caption])

  const resolvedAspectRatio =
    calculatedAspectRatio ||
    croppedAspectRatio ||
    sanityImageRatio ||
    imageSrcAspectRatio ||
    16 / 9

  useEffect(() => {
    if (imgRef.current?.complete) {
      handleImageLoad()
    }
  }, [handleImageLoad])

  return (
    <motion.figure
      ref={ref}
      className={cn(
        'relative h-auto max-h-full w-auto max-w-full overflow-hidden',
        className
      )}
      style={{
        aspectRatio: `${resolvedAspectRatio}`,
        marginBottom: `${captionHeight}px`,
      }}
    >
      {imageUrl && (
        <img
          ref={imgRef}
          src={imageUrl}
          alt={imageAlt}
          onLoad={handleImageLoad}
          className={cn('relative z-20 object-cover', {
            'transition-opacity duration-700': transition,
            'opacity-0': (!isInView && transition) || !loaded,
            'opacity-100': (isInView && transition) || (!transition && loaded),
          })}
          loading="lazy"
          {...props}
        />
      )}
      {showThumbnail && thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={imageAlt}
          onLoad={handleThumbnailLoad}
          className={cn(
            'absolute z-10 h-full w-full object-cover blur-lg transition-opacity duration-700',
            {
              'opacity-0': !thumbnailLoaded,
              'opacity-100': thumbnailLoaded,
            }
          )}
          {...props}
        />
      )}
      {showThumbnail && (
        <div className="bg-mono-800 absolute z-8 h-full w-full object-cover" />
      )}
      {image?.caption && (
        <p
          ref={captionRef}
          id={`caption-${image._id}`}
          style={{
            bottom: `-${captionHeight}px`,
          }}
          className="text-grey-700 md:text-md absolute -bottom-10 py-2 text-sm font-bold"
        >
          {image.caption}
        </p>
      )}
    </motion.figure>
  )
}

export { Image }
