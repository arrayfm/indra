import { MenuItemPreviewCell } from '@/sanity/components/menu-item-preview-cell'
import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
    // defineField({
    //   name: 'items',
    //   type: 'array',
    //   title: 'Sub menu items',
    //   of: [{ type: 'subMenuItem' }],
    // }),
  ],
  // @ts-expect-error - // TODO look into why this is throwing an error later if trouble
  components: { preview: MenuItemPreviewCell },
  preview: {
    select: {
      title: 'link.label',
      internalUrl: 'link.internalLink.slug.current',
      externalUrl: 'link.externalUrl',
      items: 'items',
    },
    prepare({ title = '', internalUrl = '', externalUrl = '', items = {} }) {
      let titleUrl = internalUrl
        ? `/${internalUrl}`
        : externalUrl
          ? externalUrl
          : ''
      if (titleUrl === '/home') titleUrl = '/'

      return {
        title: `${title || 'Untitled'} - ${titleUrl}`,
        subtitle: `Menu Item` as string,
        // subtext: `Sub menu items: ${items?.length || '0'}`,
      }
    },
  },
})

export const subMenuItem = defineType({
  name: 'subMenuItem',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule) => rule.max(160),
    }),
  ],
  // @ts-expect-error - // TODO look into why this is throwing an error later if trouble
  components: { preview: MenuItemPreviewCell },
  preview: {
    select: {
      title: 'link.label',
      internalUrl: 'link.internalLink.slug.current',
      externalUrl: 'link.externalUrl',
    },
    prepare({ title = '', internalUrl = '', externalUrl = '' }) {
      let titleUrl = internalUrl
        ? `/${internalUrl}`
        : externalUrl
          ? externalUrl
          : ''
      if (titleUrl === '/home') titleUrl = '/'

      return {
        title: `${title || 'Untitled'} - ${titleUrl}`,
        subtitle: `Menu Item` as string,
      }
    },
  },
})
