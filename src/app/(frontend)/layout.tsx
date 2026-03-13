import type { Metadata, Viewport } from 'next'
import '@/css/globals.css'
import { fontPPMori } from '@/fonts/fonts'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaviconLinks } from '@/components/partial/favicon-links'
import { TransitionProvider } from '@/components/providers/transition-provider'
import { VideoPlaybackQueueProvider } from '@/components/providers/video-playback-queue-provider'

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FaviconLinks />
      </head>
      <body
        className={`${fontPPMori.variable} text-dark-purple bg-beige text-md font-sans`}
      >
        <TransitionProvider>
          <VideoPlaybackQueueProvider>
            <>
              <Header />
              {children}
              <Footer />
            </>
          </VideoPlaybackQueueProvider>
        </TransitionProvider>
      </body>
    </html>
  )
}
