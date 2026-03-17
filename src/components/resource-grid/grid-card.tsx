import { Resource } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { Media } from '../media/media'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Button } from '../ui/button'

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
      className={cn('group col-span-10 flex flex-col gap-5 md:col-span-5')}
      href={path}
    >
      {media?.[0] && (
        <div className="flex max-h-120 items-center justify-center overflow-hidden rounded-xl">
          <Media {...media?.[0]} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {title && (
          <h2 className={cn(typePPMori({ size: 'md', weight: 'semibold' }))}>
            {title}
          </h2>
        )}
        <Button className={cn('w-fit')}>Get started</Button>
      </div>
    </ConditionalLink>
  )
}
