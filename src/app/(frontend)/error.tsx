'use client'

import { Button } from '@/components/ui/button'
import { typePPMori } from '@/lib/utils/font'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="flex max-w-lg flex-col gap-5">
        <h1 className={typePPMori({ size: 'xl' })}>
          We couldn&apos;t load this page
        </h1>
        <p className="text-grey-400">
          Please try again. If the problem continues, contact the team for
          support.
        </p>
        <div>
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}
