import { ConditionalLink } from '@/components/elements/conditional-link'
import { AnimatedComponent } from '@/components/layout/animated-component'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils/class-name'

export default function NotFound() {
  return (
    <>
      <main>
        <section />
        <Section
          id="not-found"
          className="min-h-screen-footer-mobile lg:min-h-screen-footer"
        >
          <div className="container">
            <AnimatedComponent className="grid grid-cols-12 gap-4">
              <div className="col-span-6 mt-auto flex flex-col gap-6 lg:col-span-5 lg:col-start-4">
                <h1 className={cn('text-xl')}>Page not found</h1>
                <p className={cn('text-md]')}>
                  Sorry, we couldn&apos;t find the page you were looking for.
                  Maybe you can head home.
                </p>

                <div>
                  <ConditionalLink
                    className="border-link"
                    href="/"
                    aria-label="Home"
                  >
                    Home
                  </ConditionalLink>
                </div>
              </div>
            </AnimatedComponent>
          </div>
        </Section>
      </main>
    </>
  )
}
