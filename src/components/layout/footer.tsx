import { cn } from '@/lib/utils/class-name'
import { typePPMori } from '@/lib/utils/font'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="container py-5">
        <div className="text-grey-400 flex max-w-55 flex-col gap-3">
          <p className={cn(typePPMori({ size: 'sm', weight: 'semibold' }))}>
            Company information
          </p>
          <p className={cn(typePPMori({ size: 'xs' }))}>
            © {currentYear} RPH Medica Limited.
            <br /> All rights reserved. INDRA is a trademark of RPH Medica Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}
