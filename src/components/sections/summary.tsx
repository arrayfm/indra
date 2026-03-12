import { Page } from '@/types/documents'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils/class-name'
import { getFontSize } from '@/lib/utils/theme'

export type SummaryProps = Pick<Page, 'title'>

export const Summary = ({ title }: SummaryProps) => {
  return (
    <Section id="summary">
      <div className="container">
        <h1 className={cn('font-semibold', getFontSize('xl'))}>{title}</h1>
      </div>
    </Section>
  )
}
