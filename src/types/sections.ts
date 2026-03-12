import { PortableTextBlock } from 'next-sanity'

export type TextBlock = {
  _key: string
  _type: 'textBlock'
  title?: string
  lead?: string
  description?: PortableTextBlock[]
}
