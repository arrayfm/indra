import { Image } from '@/types/elements'


export const getAspectRatio = (
  aspectRatio?: string | number | null
): number | null => {
  if (!aspectRatio) return null

  if (typeof aspectRatio === 'number') return aspectRatio

  const [width, height] = aspectRatio.split('/').map(Number)
  if (!width || !height) return null

  return width / height
}

export const getSanityImageAspectRatio = (aspectRatio?: number) => {
  if (!aspectRatio) return null
  return aspectRatio
}

export function getCroppedAspectRatio(image?: Image) {
  const { crop } = image || {}
  const { width, height } = image?.metadata?.dimensions || {}

  if (!width || !height) return null

  const cropLeft = crop?.left || 0
  const cropRight = crop?.right || 0
  const cropTop = crop?.top || 0
  const cropBottom = crop?.bottom || 0

  const croppedWidth = width * (1 - cropLeft - cropRight)
  const croppedHeight = height * (1 - cropTop - cropBottom)

  return croppedWidth / croppedHeight
}
