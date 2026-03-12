import { type SchemaTypeDefinition } from 'sanity'
import { page } from './schema/documents/page'
import { mediaEmbed, mediaItem } from './schema/types/media-item'
import { blockContentSimple } from './schema/types/block-content'
import { link } from './schema/types/link'
import { siteSettings } from './schema/documents/settings'
import { menus } from './schema/documents/menus'
import { menuItem, subMenuItem } from './schema/types/menu-item'
import { mediaUrlEmbed } from './schema/types/media-url-embed'
import { textBlock } from './schema/content/text-block'
import { video } from './schema/types/video'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // --------------- Documents ---------------
    page,
    siteSettings,
    menus,

    // --------------- Types ---------------
    video,
    mediaItem,
    mediaEmbed,
    mediaUrlEmbed,
    blockContentSimple,
    link,
    menuItem,
    subMenuItem,
    // --------------- Content ---------------
    textBlock,
  ],
}
