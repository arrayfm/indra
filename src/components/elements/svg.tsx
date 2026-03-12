import { cn } from '@/lib/utils/class-name'
import { ReactNode } from 'react'

export const SVG = ({
  className,
  width = 16,
  height = 16,
  children,
}: {
  className?: string
  width?: number
  height?: number
  children?: ReactNode
}) => {
  if (!children) return null
  return (
    <div
      className={cn('svg', className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
    >
      {children}
    </div>
  )
}
