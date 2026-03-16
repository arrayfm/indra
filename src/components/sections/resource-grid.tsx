'use client'

import { typePPMori } from '@/lib/utils/font'
import { Section } from '../layout/section'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'

import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { Article, Resource } from '@/types/documents'
import { ResourcePlayer } from '../media/resource-player'
import { BackLink } from '../elements/back-link'
import { nl2br } from '@/lib/utils/string'
import useMediaQuery from '@/lib/hooks/use-media-query'

export const ResourceGrid = ({ title, description, resources }: Article) => {
  const isMobile = useMediaQuery(1024, 'max')

  return (
    <Section id="items" className="pt-10">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-20">
        <div className="col-span-10 flex flex-col gap-2.5 md:col-span-5">
          <BackLink className="text-grey-400 col-span-1">Back</BackLink>
          {title && (
            <h1 className={cn(typePPMori({ size: '2xl' }))}>{nl2br(title)}</h1>
          )}
          {description && (
            <p className={cn('pt-12 md:w-1/2', typePPMori({ size: 'md' }))}>
              {description}
            </p>
          )}
        </div>

        {resources?.items?.map((resource, index) => {
          if (resources?.layout === 'inline')
            return (
              <div key={index} className="col-span-10">
                <ResourcePlayer {...resource} />
              </div>
            )
          if (resources?.layout === 'grid')
            return <GridCard key={index} {...resource} />
          if (resources?.layout === 'scattered') {
            if (!isMobile && index !== 0) return
            return (
              <div
                key={resource._id}
                className={cn(
                  'group col-span-10 flex min-h-100 flex-col gap-5 bg-blue-200 md:col-span-3 md:col-start-7'
                )}
              >
                {resource.title}
              </div>
            )
          }
          return null
        })}

        {resources?.layout === 'scattered' && (
          <div className="col-span-10 flex gap-2.5">
            <div className="hidden flex-col gap-x-2.5 gap-y-60 pt-60 md:grid md:w-[calc(50%-5px)] md:grid-cols-5">
              {resources?.items?.map((resource, index) => {
                if (index === 0 || index % 2 !== 1) return
                return (
                  <div
                    key={index}
                    className={cn(
                      'group col-span-3 flex h-100 flex-col gap-5 bg-green-200',
                      {
                        'col-start-2': index % 4 === 3,
                      }
                    )}
                  >
                    {resource.title}
                  </div>
                )
              })}
            </div>
            <div className="hidden flex-col gap-x-2.5 gap-y-60 md:grid md:w-[calc(50%-5px)] md:grid-cols-5">
              {resources?.items?.map((resource, index) => {
                if (index === 0 || index % 2 === 1) return

                return (
                  <div
                    key={index}
                    className={cn(
                      'group col-span-3 flex h-100 flex-col gap-5 bg-red-200',
                      {
                        'col-start-3': index % 4 === 2,
                        'col-start-2': index % 4 === 0,
                      }
                    )}
                  >
                    {resource.title}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

const GridCard = ({
  _id,
  path,
  media,
  title,
  audio,
  mediaUrlEmbed,
}: Resource) => {
  const isAudioOnly = !!audio && !mediaUrlEmbed

  return (
    <ConditionalLink
      key={_id}
      className={cn('group col-span-10 flex flex-col gap-5 md:col-span-5')}
      href={path}
    >
      {media?.[0] && (
        <div className="flex max-h-120 items-center justify-center overflow-hidden rounded-xl">
          <Media {...media?.[0]} />
        </div>
      )}
      <div
        className={cn('flex', {
          'flex-row': isAudioOnly,
          'flex-col gap-2': !isAudioOnly,
        })}
      >
        {title && (
          <h2
            className={cn(typePPMori({ size: 'md', weight: 'semibold' }), {
              'w-1/2': isAudioOnly,
            })}
          >
            {title}
          </h2>
        )}
        <Button
          className={cn('w-fit', {
            'ml-auto': isAudioOnly,
          })}
        >
          Get started
        </Button>
      </div>
    </ConditionalLink>
  )
}
