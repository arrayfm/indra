export const getMediaEmbedUrl = (
  url: string
): { embedUrl?: string; type?: 'youtube' | 'vimeo'; playbackId?: string } => {
  const isVimeoEmbed = url.includes('vimeo')
  const isYoutubeEmbed = url.includes('youtube')

  if (isVimeoEmbed) {
    const videoId = url.split('/').pop()
    return {
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      type: 'vimeo',
      playbackId: videoId,
    }
  } else if (isYoutubeEmbed) {
    const videoId = url.split('v=')[1]
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      type: 'youtube',
      playbackId: videoId,
    }
  }

  return {}
}

export const getMediaEmbedUrlThumbnail = (url: string): string => {
  if (!url) return ''

  const isVimeoEmbed = url.includes('vimeo')
  const isYoutubeEmbed = url.includes('youtube')

  if (isVimeoEmbed) {
    const videoId = url.split('/').pop()
    return `https://vumbnail.com/${videoId}.jpg`
  } else if (isYoutubeEmbed) {
    const videoId = url.split('v=')[1]
    return `https://i.ytimg.com/vi/${videoId}/default.jpg`
  }

  return ''
}
