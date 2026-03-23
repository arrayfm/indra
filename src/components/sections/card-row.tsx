import { Section } from '../layout/section'
import { RowCard } from '@/types/elements'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'
import { AnimatedComponent } from '../layout/animated-component'

export const CardRow = ({ cards }: { cards?: RowCard[] }) => {
  return (
    <Section id="items" className="pt-17.5">
      <div className="container">
        <div className="flex flex-col gap-y-7.5">
          {cards?.map((card, index) => (
            <div key={index} className="ease-cubic grid grid-cols-10 gap-x-2.5">
              <ConditionalLink
                href={card.link?.href}
                className="group col-span-10 flex gap-2.5 sm:col-span-8 md:col-span-5 lg:col-span-4"
              >
                <AnimatedComponent
                  as="div"
                  style={{ opacity: 0 }}
                  transitionOptions={{ delay: 0.25 }}
                  className="black-overlay-hover h-fit w-full max-w-1/3 rounded-xl sm:max-w-[calc(50%-5px)]"
                >
                  <Media {...card.image} transition={false} />
                </AnimatedComponent>
                <div>
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
                      'text-grey-400 mt-4',
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
                      className="mt-1.5"
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
