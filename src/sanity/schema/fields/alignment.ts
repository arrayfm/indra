import { RadioButtonGroup } from '@/sanity/components/radio-button-group'

import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdOutlineAlignHorizontalCenter,
} from 'react-icons/md'

export const alignmentOptions = [
  { value: 'left', icon: MdAlignHorizontalLeft },
  { value: 'center', icon: MdOutlineAlignHorizontalCenter },
  { value: 'right', icon: MdAlignHorizontalRight },
]

// TODO extend types for defineField to include custom components & variables

export const horizontalAlignField = {
  title: 'Align',
  name: 'horizontalAlign',
  type: 'string',
  components: { input: RadioButtonGroup },
  options: {
    list: alignmentOptions,
  },
}
