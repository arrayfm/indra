import { tv } from 'tailwind-variants'

const typography = tv(
  {
    base: '',
    variants: {},
    defaultVariants: {},
  },
  { twMerge: false }
)

export const typePPMori = tv(
  {
    extend: typography,
    base: 'font-ppmori',
    variants: {
      size: {
        xs: 'text-ppmori-xs',
        sm: 'text-ppmori-sm',
        md: 'text-ppmori-md',
        lg: 'text-ppmori-lg-mobile md:text-ppmori-lg',
        xl: 'text-ppmori-xl-mobile md:text-ppmori-xl',
        '2xl': 'text-ppmori-2xl-mobile md:text-ppmori-2xl',
      },
      weight: {
        normal: 'font-normal',
        semibold: 'font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
    },
  },
  { twMerge: false }
)
