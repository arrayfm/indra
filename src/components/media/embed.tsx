'use client'

import { VimeoEmbed, VimeoEmbedControls } from './vimeo-embed'
import { YoutubeEmbed } from './youtube-embed'
import { Embed as EmbedProps } from '@/types/elements'

type EmbedWithControls = EmbedProps & {
  externalControls?: VimeoEmbedControls
}

export const Embed = ({ externalControls, ...embed }: EmbedWithControls) => {
  if (!embed.url) return null

  return (
    <>
      {embed.url && embed.type === 'vimeo' && (
        <VimeoEmbed
          autoplay={false}
          controls={true}
          externalControls={externalControls}
          {...embed}
        />
      )}
      {embed.url && embed.type === 'youtube' && (
        <YoutubeEmbed autoplay={false} controls={true} {...embed} />
      )}
    </>
  )
}
