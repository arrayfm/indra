import { PortableTextBlock } from 'next-sanity'
import { TextBlock } from './sections'
import { Media } from './elements'

export interface Page {
  _id: string
  _type: 'page'
  pageType: string
  path: string
  title?: string
  description?: string
  slug: string
  content?: TextBlock[]
}

export interface SiteSettings {
  title?: string
  description?: string
  logo?: {
    alt: string
    _id: string
    url: string
  }
  phone?: string
  email?: string
  address?: string
  social?: SocialLink[]
}

export interface SocialLink {
  url: string
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  slug: string
  description?: string
  media?: Media[]
  resources?: Resource[]
}

export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  path: string
  mediaUrlEmbed?: string
  media?: Media[]
}
