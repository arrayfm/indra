import { PortableTextBlock } from 'next-sanity'
import { TextBlock } from './sections'
import { Link } from './elements'

export interface Page {
  _id: string
  _type: 'page'
  pageType: string
  path: string
  title?: string
  description?: PortableTextBlock[]
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

export interface Category {
  _id: string
  title: string
  slug: string
  parent?: Category
}

export interface Menu {
  title?: string
  slug: string
  items: MenuItem[]
}

export interface MenuItem extends Link {
  subItems?: SubMenuItem[]
}

export interface SubMenuItem {
  label: string
  description?: string
  href: string
}
