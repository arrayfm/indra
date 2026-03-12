import localFont from 'next/font/local'

export const fontExample = localFont({
  src: [
    {
      path: './Surt-Normal-Semibold.woff2',
      style: 'normal',
      weight: '600',
    },
  ],
  display: 'swap',
  variable: '--font-at-surt',
})
