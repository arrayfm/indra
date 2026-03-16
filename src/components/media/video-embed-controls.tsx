import { cn } from '@/lib/utils/class-name'
import { formatPlayerTime } from '@/lib/core/mux'
import { SVG } from '@/components/elements/svg'
import { Button } from '../ui/button'
import { PlaySVG } from '../svg/play'
import { typePPMori } from '@/lib/utils/font'

export type VideoEmbedControlsProps = {
  isPlaying: boolean
  isMuted: boolean
  playerTime: { played: number; duration: number }
  embedVisible: boolean
  playButtonVisible: boolean
  handlePlay: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void
  handleMuteButtonClick: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void
  handleProgressBarClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const VideoEmbedControls = ({
  isPlaying,
  isMuted,
  playerTime,
  embedVisible,
  playButtonVisible,
  handlePlay,
  handleMuteButtonClick,
  handleProgressBarClick,
}: VideoEmbedControlsProps) => {
  return (
    <div
      className={cn(
        'group absolute top-0 left-0 z-20 flex h-full w-full items-end'
      )}
    >
      <div
        className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer"
        onClick={handlePlay}
      />
      <div
        className={cn(
          'pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
          {
            'opacity-0': !playButtonVisible,
            'opacity-100': !!playButtonVisible,
          }
        )}
      >
        <Button>
          Play video
          <SVG>
            <PlaySVG />
          </SVG>
        </Button>
      </div>
      <div
        className={cn(
          'pointer-events-auto relative z-20 m-1 w-full sm:m-2',
          'bg-mid-beige flex items-center justify-stretch gap-1 rounded-full px-2 lg:gap-2',
          'transition-opacity duration-500',
          {
            'opacity-0': !embedVisible,
            'opacity-0 group-hover:opacity-100': !!embedVisible,
          }
        )}
      >
        <button
          className={cn(
            typePPMori({ size: 'xs' }),
            'cursor-pointer p-1 uppercase'
          )}
          style={{ letterSpacing: '0.1em' }}
          onClick={handlePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div
          className="relative h-[28px] flex-1 cursor-pointer"
          onClick={(e) => handleProgressBarClick(e)}
        >
          <div className="absolute top-1/2 left-0 z-10 h-[1px] w-full bg-black/10" />
          <div
            className="absolute top-1/2 left-0 z-20 h-[1px] bg-black transition"
            style={{
              width: `${
                Math.round(
                  (playerTime.played / playerTime.duration) * 100 * 100
                ) / 100
              }%`,
            }}
          />
        </div>
        <div
          className={cn(typePPMori({ size: 'xs' }), 'min-w-10 p-1 uppercase')}
        >
          {formatPlayerTime(playerTime.played)}
        </div>
        <button
          onClick={handleMuteButtonClick}
          className={cn(
            typePPMori({ size: 'xs' }),
            'z-10 cursor-pointer p-1 uppercase'
          )}
          style={{ letterSpacing: '0.1em' }}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  )
}
