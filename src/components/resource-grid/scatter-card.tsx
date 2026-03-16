import { Resource } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { Media } from '../media/media'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'
import { Button } from '../ui/button'

export const ScatterCard = ({
  _id,
  path,
  media,
  title,
  audio,
  mediaUrlEmbed,
}: Resource) => {
  const isAudioOnly = !!audio && !mediaUrlEmbed

  return (
    <ConditionalLink
      key={_id}
      className={cn('group flex flex-col gap-5')}
      href={path}
    >
      {media?.[0] && (
        <div className="flex max-h-120 items-center justify-center overflow-hidden rounded-xl">
          <Media {...media?.[0]} />
        </div>
      )}
      <div
        className={cn('flex', {
          'flex-row': isAudioOnly,
          'flex-col gap-2': !isAudioOnly,
        })}
      >
        {title && (
          <h2
            className={cn(typePPMori({ size: 'md', weight: 'semibold' }), {
              'w-1/2': isAudioOnly,
            })}
          >
            {title}
          </h2>
        )}
        <Button
          className={cn('w-fit', {
            'ml-auto': isAudioOnly,
          })}
        >
          Get started
        </Button>
      </div>
    </ConditionalLink>
  )
}
