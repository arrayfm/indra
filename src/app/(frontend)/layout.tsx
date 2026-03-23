import type { Metadata, Viewport } from 'next'
import '@/css/globals.css'
import { fontPPMori } from '@/fonts/fonts'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaviconLinks } from '@/components/partial/favicon-links'
import { TransitionProvider } from '@/components/providers/transition-provider'
import { VideoPlaybackQueueProvider } from '@/components/providers/video-playback-queue-provider'
import { getUser } from '@/lib/supabase/session'
import { getProfile } from '@/lib/supabase/queries'
import { ProfileProvider } from '@/components/providers/profile-provider'

export const metadata: Metadata = {
  title: {
    template: '%s | Indra',
    default: 'Indra',
  },
  referrer: 'same-origin',
}

export const viewport: Viewport = {
  themeColor: '#EBE6DF',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  const profile = await getProfile(user?.id)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontPPMori.variable} text-dark-purple bg-beige text-md font-sans`}
    >
      <head>
        <FaviconLinks />
      </head>
      <body>
        <TransitionProvider>
          <VideoPlaybackQueueProvider>
            <ProfileProvider profile={profile}>
              <>
                <Header profile={profile} />
                {children}
                <Footer />
              </>
            </ProfileProvider>
          </VideoPlaybackQueueProvider>
        </TransitionProvider>
      </body>
    </html>
  )
}
