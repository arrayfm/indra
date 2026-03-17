'use client'

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

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
  const resolvedHeights = useRef(
    staticHeights ??
      Array.from(
        { length: numberOfLines },
        () => height * Math.random() * 0.7 + height * 0.3
      )
  ).current

  // false = entering transition, true = clean looping (no null keyframes)
  const [looping, setLooping] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const t = setTimeout(() => setLooping(true), transitionDuration * 1000)
      return () => clearTimeout(t)
    } else {
      setLooping(false)
    }
  }, [isPlaying, transitionDuration])

  const svgWidth = numberOfLines * barWidth + (numberOfLines - 1) * gap
  const animHeightMin = Math.max(3, height * 0.3)
  const animHeightMax = height

  const showLines = linesOnly || isPlaying

  if (showLines) {
    return (
      <svg
        width={svgWidth}
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
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
                    ? // Enter: transition all bars up to animHeightMax cleanly
                      { height: animHeightMax, y: 0 }
                    : // Loop: starts at animHeightMax (where enter left off) — no jump
                      {
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
    )
  }

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M14 7.5C14 3.91059 11.0894 1 7.5 1C3.91059 1 1 3.91059 1 7.5C1 11.0894 3.91059 14 7.5 14C11.0894 14 14 11.0894 14 7.5ZM15 7.5C15 11.6417 11.6417 15 7.5 15C3.35831 15 0 11.6417 0 7.5C2.57773e-07 3.35831 3.35831 2.57764e-07 7.5 0C11.6417 0 15 3.35831 15 7.5Z"
        fill="currentColor"
      />
      <path
        d="M6.0166 4.48119C6.12034 4.50011 6.21628 4.54017 6.30273 4.59252L10.6787 6.78002C10.8993 6.89094 11.1795 7.12263 11.1797 7.49877C11.1797 7.87496 10.9003 8.10649 10.6797 8.21752L10.6787 8.21849L6.28809 10.4138C6.17288 10.4808 6.04054 10.5236 5.89844 10.529L5.89941 10.53L5.89648 10.529C5.89326 10.5292 5.88996 10.5309 5.88672 10.531L5.88574 10.529C5.71777 10.5345 5.55386 10.4903 5.41504 10.4031C5.28034 10.3184 5.167 10.1938 5.0957 10.0369L5.09473 10.0378C5.0357 9.90937 5.01076 9.76531 5.02246 9.61986V5.37865C5.01103 5.23337 5.03634 5.09175 5.09277 4.96556L5.09473 4.96068C5.16353 4.81098 5.27514 4.68338 5.41504 4.59545L5.41992 4.59252C5.56718 4.50253 5.7316 4.46369 5.88867 4.46752L6.0166 4.48119ZM6.02246 9.42845L9.88086 7.49877L6.02246 5.57006V9.42845Z"
        fill="currentColor"
      />
    </svg>
  )
}
