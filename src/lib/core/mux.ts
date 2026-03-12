import { MuxVideo } from '@/types/elements'
import { replaceCharacterInString } from '../utils/string'

export const padNumber = (num: number, length: number = 2): string => {
  return num.toString().padStart(length, '0')
}

export const formatPlayerTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)

  const displaySeconds = totalSeconds % 60
  const displayMinutes = totalMinutes % 60

  return totalHours > 0
    ? `${padNumber(totalHours)}:${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`
    : `${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`
}

type PlayerTime = {
  played: number
  duration: number
}

export const checkPlayerTimeValues = ({
  played,
  duration,
}: PlayerTime): PlayerTime => {
  const updatedPlayed = Number.isFinite(played) ? played : 0
  const updatedDuration = Number.isFinite(duration) ? duration : 0

  return {
    played: updatedPlayed,
    duration: updatedDuration,
  }
}

export type GetMuxThumbnailOptions = {
  playbackId: MuxVideo['playbackId']
  time?: number
  width?: number
}

export const getMuxThumbnail = ({
  playbackId,
  time = 0,
  width = 1920,
}: GetMuxThumbnailOptions) => {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=${width}`
}

export const getMuxVideoUrl = (playbackId: MuxVideo['playbackId']) => {
  return `https://stream.mux.com/${playbackId}.m3u8`
}

export const getMuxVideoRatio = (muxVideo: MuxVideo) => {
  if (muxVideo) {
    const muxVideoAspectRatio = replaceCharacterInString(
      muxVideo.ratio,
      ':',
      '/'
    )
    return `calc((1/${muxVideoAspectRatio}) * 100%)`
  }

  return 'calc(56.25%)'
}
