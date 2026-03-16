'use client'

import { Resource } from '@/types/documents'
import { Section } from '../layout/section'
import { Embed } from '../media/embed'
import { Media } from '../media/media'

export const ResourcePlayer = ({ mediaUrlEmbed, audio, media }: Resource) => {
  console.log('ResourcePlayer', { mediaUrlEmbed, audio })
  return (
    <Section id="resource-player" className="pt-20">
      <div className="container">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {media && <Media {...media[0]} cover />}
          <Embed {...mediaUrlEmbed} hasMedia={!!media} />
        </div>
      </div>
    </Section>
  )
}
