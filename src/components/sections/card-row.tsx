import { Section } from '../layout/section'
import { RowCard } from '@/types/elements'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'

export const CardRow = ({ cards }: { cards?: RowCard[] }) => {
  return (
    <Section id="items" className="pt-17.5">
      <div className="container">
        <div className="flex flex-col gap-y-7.5">
          {cards?.map((card, index) => (
            <div key={index} className="grid grid-cols-10 gap-x-2.5">
              <div className="col-span-10 flex gap-2.5 sm:col-span-8 md:col-span-5 lg:col-span-4">
                <div className="h-fit w-full max-w-1/3 sm:max-w-[calc(50%-5px)]">
                  <Media {...card.image} />
                </div>
                <div>
                  <h3 className={cn(typePPMori({ size: 'xl' }))}>
                    {card.title}
                  </h3>
                  <p
                    className={cn(
                      'text-grey-400 mt-4.5',
                      typePPMori({ size: 'md' })
                    )}
                  >
                    {card.description}
                  </p>
                  {card.link?.href && (
                    <ConditionalLink
                      href={card.link.href}
                      className="mt-1.5 block"
                    >
                      <Button>{card.link.label || 'Explore'}</Button>
                    </ConditionalLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
