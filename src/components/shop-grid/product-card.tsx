'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { ConditionalLink } from '../elements/conditional-link'
import { AnimatedComponent } from '../layout/animated-component'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Media } from '../media/media'

const productCardVariants = cva('', {
  variants: {
    imageSize: {
      sm: 'max-h-48',
      md: 'max-h-76',
    },
    titleSize: {
      sm: '',
      md: '',
      lg: '',
    },
    showPrice: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    imageSize: 'md',
    titleSize: 'md',
    showPrice: true,
  },
})

type ProductCardVariants = VariantProps<typeof productCardVariants>

export const ProductCard = ({
  _id,
  path,
  imageUrl,
  title,
  price,
  size,
  imageSize,
  titleSize,
  showPrice,
}: any & ProductCardVariants) => {
  return (
    <ConditionalLink
      key={_id}
      className="group flex flex-col gap-3"
      href={path}
    >
      {imageUrl && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.25 }}
          className="relative mb-5 w-full"
        >
          <Media
            src={imageUrl}
            _type="image"
            className={cn(productCardVariants({ imageSize }))}
          />
        </AnimatedComponent>
      )}
      {title && (
        <AnimatedComponent
          as="h2"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.35 }}
          className={cn(typePPMori({ size: titleSize ?? 'xl' }))}
        >
          {title} {size && <span className="text-grey-400">{size}</span>}
        </AnimatedComponent>
      )}
      {showPrice !== false && (
        <AnimatedComponent
          as="h3"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.45 }}
          className={cn('text-purple', typePPMori({ size: 'md' }))}
        >
          <span className="text-grey-400">From </span>
          {price}
        </AnimatedComponent>
      )}
    </ConditionalLink>
  )
}
