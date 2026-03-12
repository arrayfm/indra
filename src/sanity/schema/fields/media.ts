import { defineField } from 'sanity'

export const aspectRatios = [
  { title: 'Auto [Uploaded Ratio]', value: 'auto' },
  { title: '2:1', value: '2/1' },
  { title: '16:9', value: '16/9' },
  { title: '3:2', value: '3/2' },
  { title: '4:3', value: '4/3' },
  { title: '1:1', value: '1/1' },
  { title: '4:5', value: '4/5' },
  { title: '3:4', value: '3/4' },
]

export const aspectRatioField = defineField({
  title: 'Aspect Ratio',
  name: 'aspectRatio',
  type: 'string',
  initialValue: 'auto',
  options: {
    list: aspectRatios,
    layout: 'dropdown',
  },
})
