import { PortableTextBlock } from 'next-sanity'
import { LinkItem } from './elements'

export type TextBlock = {
  _key: string
  _type: 'textBlock'
  title?: string
  lead?: string
  description?: PortableTextBlock[]
}

export type TextContent = {
  _key: string
  _type: 'textContent'
  title: string
}

export type PatientDashboardContentLinks = {
  _key: string
  _type: 'links'
  items: LinkItem[]
}
