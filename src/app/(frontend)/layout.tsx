import type { Metadata, Viewport } from 'next'
import '@/css/globals.css'
import { fontExample } from '@/fonts/fonts'
import { sanityFetch } from '@/sanity/lib/fetch'
import { Menu as MenuProps } from '@/types/documents'
import { getMenus } from '@/sanity/queries/get-menu'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaviconLinks } from '@/components/partial/favicon-links'
import { TransitionProvider } from '@/components/providers/transition-provider'
import { VideoPlaybackQueueProvider } from '@/components/providers/video-playback-queue-provider'

// import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: {
    template: '%s | Base Sanity',
    default: 'Base Sanity',
  },
  referrer: 'same-origin',
}

// export const viewport: Viewport = {
//   themeColor: '#',
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menus = await sanityFetch({ query: getMenus })

  const headerMenu = menus.find((menu: MenuProps) => menu.slug === 'header')
  const footerMenu = menus.find((menu: MenuProps) => menu.slug === 'footer')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FaviconLinks />
      </head>
      <body className={`${fontExample.variable} font-grot bg-grey-200 text-sm`}>
        <TransitionProvider>
          <VideoPlaybackQueueProvider>
            <>
              <Header menu={headerMenu} />
              {children}
              <Footer menu={footerMenu} />
            </>
          </VideoPlaybackQueueProvider>
        </TransitionProvider>
      </body>
    </html>
  )
}
