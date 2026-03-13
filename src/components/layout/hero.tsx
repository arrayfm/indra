import { typePPMori } from '@/lib/utils/font'
import { BackLink } from '../elements/back-link'
import { Section } from './section'
import { nl2br } from '@/lib/utils/string'
import { cn } from '@/lib/utils/class-name'
import { Article, Page } from '@/types/documents'

export const Hero = ({ title, description }: Page | Article) => {
  return (
    <Section id="hero" className="pt-10">
      <div className="container grid grid-cols-10 gap-2.5">
        <BackLink className="text-grey-400 col-span-1">Back</BackLink>
        <h1
          className={cn('col-span-6 row-start-2', typePPMori({ size: '2xl' }))}
        >
          {nl2br(title)}
        </h1>
        <p
          className={cn(
            'col-span-3 row-start-3 pt-12',
            typePPMori({ size: 'md' })
          )}
        >
          {description}
        </p>
      </div>
    </Section>
  )
}
