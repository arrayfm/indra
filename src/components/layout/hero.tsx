import { typePPMori } from '@/lib/utils/font'
import { BackLink } from '../elements/back-link'
import { Section } from './section'
import { nl2br } from '@/lib/utils/string'
import { cn } from '@/lib/utils/class-name'
import { Article, Page, Resource } from '@/types/documents'

type HeroProps = Pick<Page | Article | Resource, 'title' | 'description'> & {
  hasBacklink?: boolean
}

export const Hero = ({ title, description, hasBacklink = true }: HeroProps) => {
  return (
    <Section id="hero" className="pt-10">
      <div className="container grid grid-cols-10 gap-2.5">
        {hasBacklink && (
          <BackLink className="text-grey-400 col-span-1">Back</BackLink>
        )}
        {title && (
          <h1
            className={cn(
              'col-span-10 row-start-2 md:col-span-6',
              typePPMori({ size: '2xl' })
            )}
          >
            {nl2br(title)}
          </h1>
        )}
        {description && (
          <p
            className={cn(
              'col-span-10 row-start-3 pt-12 md:col-span-3',
              typePPMori({ size: 'md' })
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Section>
  )
}
