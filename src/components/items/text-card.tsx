import { ConditionalLink } from '@/components/elements/conditional-link'
import { Button } from '@/components/ui/button'
import { typePPMori } from '@/lib/utils/font'
import { AnimatedComponent } from '../layout/animated-component'
import { cn } from '@/lib/utils/class-name'
import { Link } from '@/types/elements'

interface TextCardProps {
  title?: string
  description?: string
  link?: Link
}

export function TextCard({ title, description, link }: TextCardProps) {
  return (
    <div className="col-span-3 flex flex-col gap-2">
      {title && (
        <AnimatedComponent
          as="h3"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.1 }}
          className={cn(typePPMori({ size: 'lg' }))}
        >
          {title}
        </AnimatedComponent>
      )}

      {description && (
        <AnimatedComponent
          as="p"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.2 }}
          className={cn(
            'text-grey-400 mb-4 max-w-xs',
            typePPMori({ size: 'md' })
          )}
        >
          {description}
        </AnimatedComponent>
      )}

      {link && (
        <AnimatedComponent
          as="div"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          transitionOptions={{ delay: 0.3 }}
        >
          <ConditionalLink href={link?.href} target="_blank">
            <Button>{link?.label || 'Learn more'}</Button>
          </ConditionalLink>
        </AnimatedComponent>
      )}
    </div>
  )
}
