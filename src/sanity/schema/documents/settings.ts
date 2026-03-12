import {
  mapIconsToSanityListOptions,
  renderIcon,
  socialIconMap,
} from '@/lib/utils/icon'
import { IconButtonSelector } from '@/sanity/components/icon-button-selector'
import { defineField } from 'sanity'

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'array',
      description:
        'Add other sites/pages associated to your site i.e. instagram, facebook, etc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: mapIconsToSanityListOptions(socialIconMap),
              },
              components: { input: IconButtonSelector },
            },
          ],
          preview: {
            select: {
              url: 'url',
              icon: 'icon',
            },
            prepare({ url, icon }) {
              const Icon = renderIcon(icon)

              return {
                title: url,
                media: icon ? Icon : null,
              }
            },
          },
        },
      ],
    }),
  ],
}
