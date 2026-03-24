'use client'

import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Media } from '../media/media'

export const ProductCard = ({
  _id,
  path,
  imageUrl,
  title,
  price,
  size,
  index,
}: any) => {
  return (
    <ConditionalLink
      key={_id}
      className={cn('group col-span-7 flex flex-col gap-3 sm:col-span-3', {
        'sm:col-start-6': index % 2 === 1,
      })}
      href={path}
    >
      {imageUrl && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.25 }}
          className="relative mb-5 max-h-76 w-full"
        >
          <Media src={imageUrl} _type="image" />
        </AnimatedComponent>
      )}
      {title && (
        <AnimatedComponent
          as="h2"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.35 }}
          className={cn(typePPMori({ size: 'xl' }))}
        >
          {title} {size && <span className="text-grey-400">{size}</span>}
        </AnimatedComponent>
      )}
      <AnimatedComponent
        as="h3"
        style={{ opacity: 0, transform: 'translateY(12px)' }}
        transitionOptions={{ delay: 0.45 }}
        className={cn('text-purple', typePPMori({ size: 'md' }))}
      >
        <span className="text-grey-400">From </span>
        {price}
      </AnimatedComponent>
    </ConditionalLink>
  )
}
