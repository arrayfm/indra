import { Section } from '../layout/section'
import { PatientHistoryLinks } from './patient-history-links'

const PatientHistoryTemplate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Section id="patient-history" className="pt-12 md:pt-20">
      <div className="container">
        <div className="flex grid-cols-10 flex-col gap-12 md:grid md:gap-2.5">
          <div className="md:col-span-3">
            <PatientHistoryLinks />
          </div>
          <div className="md:col-span-7">{children}</div>
        </div>
      </div>
    </Section>
  )
}

export default PatientHistoryTemplate
