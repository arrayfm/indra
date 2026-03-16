import { TextBlock } from './sections'
import { Audio, Embed, Media } from './elements'

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
  path: string
  description?: string
  media?: Media[]
  resources?: ArticleResourcesObject
}

export type ArticleResourcesObject = {
  layout?: 'grid' | 'scattered'
  items: Resource[]
}

export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  description?: string
  slug: string
  path: string
  mediaUrlEmbed?: Embed
  audio?: Audio
  media?: Media[]
}
