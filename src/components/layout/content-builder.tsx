import { Page } from '@/types/documents'
import { TextBlock } from '../sections/text-block'
import { Section } from './section'

export const ContentBuilder = ({ content }: { content?: Page['content'] }) => {
  if (!content) return null
  return (
    <>
      {content.map((section, index) => {
        switch (section._type) {
          default:
            return (
              <Section key={index} id="missing-section-type">
                <div className="container">
                  <div className="py-12">
                    <h2 className="text-[32px]">Missing Section Type</h2>
                  </div>
                </div>
              </Section>
            )
        }
      })}
    </>
  )
}
