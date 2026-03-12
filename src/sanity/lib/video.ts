import { Video, VideoOutputSize } from '@/types/elements'
import { SanityFileAsset } from '@sanity/asset-utils'

export const parseSanityVideoAssetToUrl = ({
  video,
  outputSize = { width: 1280 },
}: {
  video?: Video | SanityFileAsset
  outputSize?: VideoOutputSize
}) => {
  if (!video || !video?.assetId) return undefined

  const url = `https://video.array.design/array/${video.assetId}.${video.extension}`

  const params = new URLSearchParams()
  if (outputSize?.width && Number.isFinite(outputSize.width)) {
    params.set('w', `${outputSize.width}`)
  }
  if (outputSize?.height && Number.isFinite(outputSize.height)) {
    params.set('h', `${outputSize.height}`)
  }
  if (outputSize?.ratio && Number.isFinite(outputSize.ratio)) {
    params.set('r', `${outputSize.ratio}`)
  }
  if (outputSize?.poster) {
    params.set('p', '1')
  }

  return `${url}?${params.toString()}`
}
