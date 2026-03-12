import { defineField } from 'sanity'

export const gridSizes = [
  { title: '[1/12]', value: '1', badgeTone: 'default' },
  { title: '[2/12]', value: '2', badgeTone: 'default' },
  { title: '[3/12]', value: '3', badgeTone: 'default' },
  { title: '[4/12]', value: '4', badgeTone: 'default' },
  { title: '[5/12]', value: '5', badgeTone: 'primary' },
  { title: '[6/12]', value: '6', badgeTone: 'primary' },
  { title: '[7/12]', value: '7', badgeTone: 'caution' },
  { title: '[8/12]', value: '8', badgeTone: 'caution' },
  { title: '[9/12]', value: '9', badgeTone: 'caution' },
  { title: '[10/12]', value: '10', badgeTone: 'critical' },
  { title: '[11/12]', value: '11', badgeTone: 'critical' },
  { title: '[12/12]', value: '12', badgeTone: 'critical' },
]

export const projectGridSizesField = defineField({
  title: 'Size',
  name: 'size',
  type: 'string',
  options: {
    list: gridSizes,
    layout: 'dropdown',
    direction: 'horizontal',
  },
})

export const gridSizesField = defineField({
  title: 'Size',
  name: 'size',
  type: 'string',
  options: {
    list: gridSizes,
    layout: 'dropdown',
  },
})
