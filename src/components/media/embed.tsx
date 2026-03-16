'use client'

import { VimeoEmbed } from './vimeo-embed'
import { YoutubeEmbed } from './youtube-embed'
import { Embed as EmbedProps } from '@/types/elements'

export const Embed = (embed: EmbedProps) => {
  if (!embed.url) return null

  return (
    <>
      {embed.url && embed.type === 'vimeo' && (
        <VimeoEmbed autoplay={false} controls={true} {...embed} />
      )}
      {embed.url && embed.type === 'youtube' && (
        <YoutubeEmbed autoplay={false} controls={true} {...embed} />
      )}
    </>
  )
}
