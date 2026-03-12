import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils/class-name'
import { getFontSize } from '@/lib/utils/theme'
import { TextBlock as TextBlockProps } from '@/types/sections'
import { PortableTextBlock } from '@/components/elements/portable-text-block'
import { nl2br, truncate } from '@/lib/utils/string'
import { AnimatedComponent } from '../layout/animated-component'

export const TextBlock = ({
  _key,
  title,
  lead,
  description,
}: TextBlockProps) => {
  return (
    <Section
      id={title || truncate(lead, 30) || `text-block-${_key}`}
      className={cn('overflow-hidden')}
    >
      <div className="container">
        <div className={cn('flex flex-col gap-5')}>
          {(title || lead) && (
            <AnimatedComponent>
              {title && (
                <h2 className={cn('pb-1 font-bold', getFontSize('xl'))}>
                  {title}
                </h2>
              )}
              {lead && (
                <p className={cn('font-bold text-mono-400', getFontSize('md'))}>
                  {nl2br(lead)}
                </p>
              )}
            </AnimatedComponent>
          )}
          <AnimatedComponent
            transitionOptions={{ delay: 0.35, duration: 0.75 }}
          >
            {description && (
              <PortableTextBlock className="max-w-2xl" text={description} />
            )}
          </AnimatedComponent>
        </div>
      </div>
    </Section>
  )
}
