import {
  FontSizes,
  HorizontalAlign,
  GridSizes,
  SectionPadding,
  ButtonTheme,
} from '@/types/theme'

export const getFontSize = (size?: FontSizes) => {
  switch (size) {
    case 'xs':
      return 'md:text-xs text-xs-mobile'
    case 'sm':
      return 'md:text-sm text-sm-mobile'
    case 'md':
      return 'md:text-md text-md-mobile'
    case 'lg':
      return 'md:text-lg text-lg-mobile'
    case 'xl':
      return 'md:text-xl text-xl-mobile'
    case '2xl':
      return 'md:text-2xl text-2xl-mobile'
    case '3xl':
      return 'md:text-3xl text-3xl-mobile'
    default:
      return 'md:text-md text-md-mobile'
  }
}

export const getGridSize = (size?: GridSizes, isPortrait?: boolean) => {
  switch (size) {
    case '1':
      return 'col-span-2 lg:col-span-1'
    case '2':
      return 'col-span-4 lg:col-span-2'
    case '3':
      return 'col-span-6 lg:col-span-3'
    case '4':
      return isPortrait
        ? 'col-span-9 lg:col-span-4'
        : 'col-span-12 lg:col-span-4'
    case '5':
      return isPortrait
        ? 'col-span-9 lg:col-span-5'
        : 'col-span-12 lg:col-span-5'
    case '6':
      return isPortrait
        ? 'col-span-9 lg:col-span-6'
        : 'col-span-12 lg:col-span-6'
    case '7':
      return isPortrait
        ? 'col-span-9 lg:col-span-7'
        : 'col-span-12 lg:col-span-7'
    case '8':
      return isPortrait
        ? 'col-span-9 lg:col-span-8'
        : 'col-span-12 lg:col-span-8'
    case '9':
      return 'col-span-12 lg:col-span-9'
    case '10':
      return 'col-span-12 lg:col-span-10'
    case '11':
      return 'col-span-12 lg:col-span-11'
    case '12':
      return 'col-span-12'
    default:
      return 'col-span-12'
  }
}

export const getHorizontalMargin = (align?: HorizontalAlign) => {
  switch (align) {
    case 'left':
      return 'lg:mr-auto'
    case 'center':
      return 'lg:mx-auto'
    case 'right':
      return 'lg:ml-auto'
    default:
      return 'lg:mr-auto'
  }
}

export const getSectionPadding = (size?: SectionPadding) => {
  switch (size) {
    case 'none':
      return 'py-0 lg:py-0'
    case 'sm':
      return 'py-[28px] lg:py-[40px]'
    case 'lg':
      return 'py-[80px] lg:py-[120px]'
    case 'md':
    default:
      return 'py-[56px] lg:py-[80px]'
  }
}

export const getSectionTheme = (theme?: string) => {
  switch (theme) {
    case 'white':
    default:
      return 'bg-white text-black'
  }
}

export const getButtonTheme = (theme: ButtonTheme): string => {
  switch (theme) {
    case 'black':
      return 'bg-black text-white hover:bg-mono-500 group-hover:bg-mono-500'
    case 'white':
      return 'bg-white text-black hover:bg-mono-100 group-hover:bg-mono-100'
    case 'mono-100':
    default:
      return 'bg-mono-100 text-black hover:bg-mono-200 group-hover:bg-mono-200'
  }
}
