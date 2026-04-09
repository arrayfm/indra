import { PatientDashboardContent as PatientDashboardContentProps } from '@/types/documents'
import { Section } from '../layout/section'
import { TextCard } from '../items/text-card'
import { AnimatedComponent } from '../layout/animated-component'
import { typePPMori } from '@/lib/utils/font'
import { cn } from '@/lib/utils/class-name'

export const PatientDashboardContent = ({
  content,
}: {
  content: PatientDashboardContentProps
}) => {
  if (!content) return null

  return (
    <>
      {content.map((section, index) => {
        switch (section._type) {
          case 'textContent':
            return (
              <AnimatedComponent
                as="h2"
                style={{ opacity: 0, transform: 'translateY(12px)' }}
                transitionOptions={{ delay: 0.1 }}
                className={cn(
                  'text-grey-400 col-span-6',
                  typePPMori({ size: 'lg' })
                )}
              >
                {section.title}
              </AnimatedComponent>
            )
          case 'links':
            return (
              <Section
                key={index}
                id={`links-section-${index}`}
                className="mb-4 flex grid-cols-6 flex-col gap-x-2.5 gap-y-10 md:grid"
              >
                {section.items.map((item, itemIndex) => (
                  <TextCard
                    key={itemIndex}
                    title={item.title}
                    description={item.description}
                    link={item.link}
                  />
                ))}
              </Section>
            )

          default:
            return <></>
        }
      })}
    </>
  )
}
