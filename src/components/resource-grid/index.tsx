'use client'

import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'
import { nl2br } from '@/lib/utils/string'
import useMediaQuery from '@/lib/hooks/use-media-query'
import { Article } from '@/types/documents'
import { AnimatedComponent } from '../layout/animated-component'
import { Section } from '../layout/section'
import { BackLink } from '../elements/back-link'
import { ResourcePlayer } from '../media/resource-player'
import { GridCard } from './grid-card'
import { ScatterCard } from './scatter-card'

const Header = ({
  title,
  description,
}: Pick<Article, 'title' | 'description'>) => (
  <div className="col-span-10 flex flex-col gap-2.5 md:col-span-6">
    <BackLink className="text-grey-400 col-span-1">Back</BackLink>

    {title && (
      <AnimatedComponent
        as="h1"
        style={{ transform: 'translateY(20px)', opacity: 0 }}
        className={cn(typePPMori({ size: '2xl' }))}
      >
        {nl2br(title)}
      </AnimatedComponent>
    )}

    {description && (
      <AnimatedComponent
        as="p"
        style={{ transform: 'translateY(20px)', opacity: 0 }}
        transitionOptions={{ delay: 0.375 }}
        className={cn('pt-12 md:w-1/2', typePPMori({ size: 'md' }))}
      >
        {nl2br(description)}
      </AnimatedComponent>
    )}
  </div>
)

type ScatterColumnProps = {
  items?: NonNullable<Article['resources']>['items']
  filter: (index: number) => boolean
  columnClass: string
}

const ScatterColumn = ({ items, filter, columnClass }: ScatterColumnProps) => (
  <div
    className={cn(
      'hidden h-fit md:grid md:grid-cols-5 md:gap-x-2.5 md:gap-y-60',
      columnClass
    )}
  >
    {items?.map((resource, index) => {
      if (!filter(index)) return null
      return (
        <div
          key={index}
          className={cn('col-span-3 flex flex-col', {
            'col-start-2': index % 4 === 3 || index % 4 === 0,
            'col-start-3': index % 4 === 2,
          })}
        >
          <ScatterCard {...resource} />
        </div>
      )
    })}
  </div>
)

const ScatteredLayout = ({
  items,
}: {
  items?: NonNullable<Article['resources']>['items']
}) => (
  <div className="col-span-10 flex gap-2.5">
    <ScatterColumn
      items={items}
      filter={(i) => i !== 0 && i % 2 === 1}
      columnClass="pt-60 md:w-[calc(50%-5px)]"
    />
    <ScatterColumn
      items={items}
      filter={(i) => i !== 0 && i % 2 === 0}
      columnClass="pt-20 md:w-[calc(50%-5px)]"
    />
  </div>
)

const ResourceGrid = ({ title, description, resources }: Article) => {
  const isMobile = useMediaQuery(1024, 'max')
  const { layout, items } = resources ?? {}

  return (
    <Section id="items" className="pt-10">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-20">
        <Header title={title} description={description} />

        {layout !== 'scattered' && (
          <div className="col-span-4 hidden md:block" />
        )}

        {items?.map((resource, index) => {
          if (layout === 'inline') {
            return (
              <div key={index} className="col-span-10">
                <ResourcePlayer {...resource} />
              </div>
            )
          }

          if (layout === 'grid') {
            return (
              <div key={index} className="col-span-10 md:col-span-5">
                <GridCard {...resource} />
              </div>
            )
          }

          if (layout === 'scattered') {
            if (!isMobile && index !== 0) return null
            return (
              <div
                key={index}
                className="col-span-10 md:col-span-3 md:col-start-7"
              >
                <ScatterCard {...resource} />
              </div>
            )
          }

          return null
        })}

        {layout === 'scattered' && <ScatteredLayout items={items} />}
      </div>
    </Section>
  )
}

export default ResourceGrid
