import { Section } from '../layout/section'
import { RowCard } from '@/types/elements'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { AnimatedComponent } from '../layout/animated-component'

export const CardColumns = ({
  cards,
  stack = false,
}: {
  cards?: RowCard[]
  stack?: boolean
}) => {
  return (
    <Section id="items" className="pt-17.5">
      <div className="container">
        <div
          className={cn({
            'grid grid-cols-10 gap-x-2.5 gap-y-10': !stack,
            'flex flex-col gap-10': !!stack,
          })}
        >
          {cards?.map((card, index) => (
            <div
              key={index}
              className={cn({
                'col-span-10 sm:col-span-4 lg:col-span-3': !stack,
              })}
            >
              <ConditionalLink
                href={card.link?.href}
                className="group flex flex-col gap-2.5"
              >
                {(card?.image?._type === 'image' ||
                  card?.image?._type === 'video') && (
                  <AnimatedComponent
                    as="div"
                    style={{ opacity: 0 }}
                    transitionOptions={{ delay: 0.25 }}
                    className="black-overlay-hover h-fit w-full max-w-1/3 rounded-xl sm:max-w-[calc(66%-5px)]"
                  >
                    <Media {...card.image} transition={false} />
                  </AnimatedComponent>
                )}
                <div className="flex flex-col gap-4">
                  <AnimatedComponent
                    as="h3"
                    style={{ opacity: 0, transform: 'translateY(12px)' }}
                    transitionOptions={{ delay: 0.35 }}
                    className={cn(typePPMori({ size: 'xl' }))}
                  >
                    {card.title}
                  </AnimatedComponent>
                  <AnimatedComponent
                    as="p"
                    style={{ opacity: 0, transform: 'translateY(12px)' }}
                    transitionOptions={{ delay: 0.45 }}
                    className={cn(
                      'text-grey-400 max-w-70',
                      typePPMori({ size: 'md' })
                    )}
                  >
                    {card.description}
                  </AnimatedComponent>
                  {card.link?.href && (
                    <AnimatedComponent
                      as="div"
                      style={{ opacity: 0, transform: 'translateY(12px)' }}
                      transitionOptions={{ delay: 0.55 }}
                    >
                      <Button>{card.link.label || 'Explore'}</Button>
                    </AnimatedComponent>
                  )}
                </div>
              </ConditionalLink>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
