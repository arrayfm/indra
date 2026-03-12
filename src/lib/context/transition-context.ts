import { transitionVariants } from '@/components/providers/transition-provider'
import { VariantProps } from 'class-variance-authority'
import { createContext, Dispatch, SetStateAction } from 'react'

type Animation = 'fade-out' | 'fade-in' | 'fade-out-in'

interface TransitionContext {
  animation: React.MutableRefObject<Animation | null>
  className: string
  setClassName: Dispatch<SetStateAction<string>>
  backgroundTheme?: VariantProps<typeof transitionVariants>['backgroundTheme']
  setBackgroundTheme: Dispatch<
    SetStateAction<
      VariantProps<typeof transitionVariants>['backgroundTheme'] | undefined
    >
  >
  headerVisible: boolean
  setHeaderVisible: Dispatch<SetStateAction<boolean>>
  pageReady: boolean
  setPageReady: Dispatch<SetStateAction<boolean>>
}

const TransitionContext = createContext<TransitionContext | null>(null)

export { type Animation, TransitionContext }
