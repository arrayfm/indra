import { Section } from '../layout/section'
import { PatientHistoryLinks } from './patient-history-links'

const PatientHistoryTemplate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Section id="patient-history" className="pt-20">
      <div className="container">
        <div className="grid grid-cols-10 gap-2.5">
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
