import localFont from 'next/font/local'

export const fontPPMori = localFont({
  src: [
    {
      path: './PPMori-Extralight.otf',
      style: 'normal',
      weight: '200',
    },
    {
      path: './PPMori-ExtralightItalic.otf',
      style: 'italic',
      weight: '200',
    },
    {
      path: './PPMori-Regular.otf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './PPMori-RegularItalic.otf',
      style: 'italic',
      weight: '400',
    },
    {
      path: './PPMori-SemiBold.otf',
      style: 'normal',
      weight: '600',
    },
    {
      path: './PPMori-SemiBoldItalic.otf',
      style: 'italic',
      weight: '600',
    },
  ],
  display: 'swap',
  variable: '--font-pp-mori',
})
