'use client'

import { Article } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { Button } from '../ui/button'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Media } from '../media/media'

const gridPlacement = (index: number) => {
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

export const ArticleCard = ({
  _id,
  path,
  media,
  title,
  index,
}: Article & { index: number }) => {
  return (
    <ConditionalLink
      key={_id}
      className={cn(gridPlacement(index), 'group flex flex-col gap-5')}
      href={path}
    >
      {media?.[0] && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.25 }}
          className="black-overlay-hover flex max-h-120 items-center justify-center overflow-hidden rounded-xl"
        >
          <Media {...media?.[0]} />
        </AnimatedComponent>
      )}
      {title && (
        <AnimatedComponent
          as="h2"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.35 }}
          className={cn(typePPMori({ size: 'xl' }))}
        >
          {title}
        </AnimatedComponent>
      )}
      <AnimatedComponent
        as="div"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.45 }}
      >
        <Button className="w-fit">Explore</Button>
      </AnimatedComponent>
    </ConditionalLink>
  )
}
