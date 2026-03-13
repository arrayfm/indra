import { typePPMori } from '@/lib/utils/font'
import { Section } from '../layout/section'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'

import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { ArticleResourcesObject, Resource } from '@/types/documents'

const scatterGridPlacement = (index: number) => {
  const placementIndex = index % 3
  switch (placementIndex) {
    case 1:
      return 'col-span-10 md:col-span-3 md:col-start-8 md:row-start-2 row-span-2'
    case 2:
      return 'col-span-10 md:col-span-4 md:col-start-6 md:row-start-4'
    case 0:
    default:
      return 'col-span-10 md:col-span-6 row-span-2'
  }
}

export const ResourceGrid = ({
  layout,
  items,
}: {
  layout?: ArticleResourcesObject['layout']
  items?: Resource[]
}) => {
  console.log('ResourceGrid', { layout, items })
  return (
    <Section id="items" className="pt-12">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-20">
        {items?.map((resource, index) => {
          if (layout === 'grid') return <GridCard key={index} {...resource} />
          if (layout === 'scattered')
            return (
              <div
                key={resource._id}
                className={cn(
                  scatterGridPlacement(index),
                  'group flex flex-col gap-5'
                )}
              />
            )
          return null
        })}
      </div>
    </Section>
  )
}

const GridCard = ({ _id, path, media, title }: Resource) => {
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
      {title && (
        <h2 className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
          {title}
        </h2>
      )}
      <Button className="w-fit">Get started</Button>
    </ConditionalLink>
  )
}
