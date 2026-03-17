'use client'

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PlaySVG } from './play'
import { cn } from '@/lib/utils/class-name'

export const AudioPlaySVG = ({
  isPlaying,
  numberOfLines = 5,
  linesOnly = false,
  height = 15,
  barWidth = 1.5,
  gap = 1.5,
  staticHeights,
  animationDuration = 2,
  transitionDuration = 0.35,
  className,
  style,
}: {
  isPlaying?: boolean
  numberOfLines?: number
  linesOnly?: boolean
  height?: number
  barWidth?: number
  gap?: number
  staticHeights?: number[]
  animationDuration?: number
  transitionDuration?: number
  className?: string
  style?: React.CSSProperties
}) => {
  const seeded = (i: number) => {
    const x = Math.sin(i * 999) * 10000
    return x - Math.floor(x)
  }

  const resolvedHeights =
    staticHeights ??
    Array.from(
      { length: numberOfLines },
      (_, i) => height * (0.3 + seeded(i) * 0.7)
    )

  const [looping, setLooping] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const t = setTimeout(() => setLooping(true), transitionDuration * 1000)
      return () => clearTimeout(t)
    } else {
      setLooping(false)
    }
  }, [isPlaying, transitionDuration])

  const showLines = linesOnly || isPlaying

  const svgWidth = showLines
    ? numberOfLines * barWidth + (numberOfLines - 1) * gap
    : 15
  const animHeightMin = Math.max(3, height * 0.3)
  const animHeightMax = height

  return (
    <div
      className={cn(className, 'svg relative')}
      style={{
        width: svgWidth,
        height,
        ...style,
      }}
    >
      <motion.div
        initial={false}
        animate={{ opacity: showLines ? 0 : 1 }}
        transition={{ duration: transitionDuration }}
      >
        <PlaySVG />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: showLines ? 1 : 0 }}
        transition={{ duration: transitionDuration }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
        }}
      >
        <svg
          width={svgWidth}
          height={height}
          viewBox={`0 0 ${svgWidth} ${height}`}
          fill="none"
        >
          {Array.from({ length: numberOfLines }).map((_, i) => {
            const x = i * (barWidth + gap)
            const staticH = resolvedHeights[i] ?? height * 0.3
            const staticY = (height - staticH) / 2
            const delay = i * (animationDuration / numberOfLines)

            return (
              <motion.rect
                key={i}
                x={x}
                width={barWidth}
                rx={barWidth / 2}
                fill="currentColor"
                initial={{ height: staticH, y: staticY }}
                animate={
                  !isPlaying
                    ? { height: staticH, y: staticY }
                    : !looping
                      ? { height: animHeightMax, y: 0 }
                      : {
                          height: [animHeightMax, animHeightMin, animHeightMax],
                          y: [0, (height - animHeightMin) / 2, 0],
                        }
                }
                transition={
                  !isPlaying
                    ? { duration: transitionDuration, ease: 'easeOut' }
                    : !looping
                      ? { duration: transitionDuration, ease: 'easeOut' }
                      : {
                          repeat: Infinity,
                          duration: animationDuration,
                          delay,
                          ease: 'easeInOut',
                        }
                }
              />
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}
