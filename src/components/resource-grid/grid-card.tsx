import { Resource } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { Media } from '../media/media'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Button } from '../ui/button'
import { AnimatedComponent } from '../layout/animated-component'

export const GridCard = ({
  _id,
  path,
  media,
  title,
  audio,
  mediaUrlEmbed,
}: Resource) => {
  return (
    <ConditionalLink
      key={_id}
      className="group flex flex-col gap-5"
      href={path}
    >
      {media?.[0] && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0 }}
          transitionOptions={{ delay: 0.275 }}
          className="black-overlay-hover flex max-h-120 items-center justify-center overflow-hidden rounded-xl"
        >
          <Media {...media?.[0]} transition={false} />
        </AnimatedComponent>
      )}
      <div className="flex flex-col gap-2">
        {title && (
          <AnimatedComponent
            as="h2"
            style={{ opacity: 0, transform: 'translateY(12px)' }}
            transitionOptions={{ delay: 0.375 }}
            className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}
          >
            {title}
          </AnimatedComponent>
        )}
        <AnimatedComponent
          as="div"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.5 }}
        >
          <Button className={cn('w-fit')}>Get started</Button>
        </AnimatedComponent>
      </div>
    </ConditionalLink>
  )
}
