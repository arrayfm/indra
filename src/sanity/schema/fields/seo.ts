import { defineField } from 'sanity'

export const seo = defineField({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  group: 'seo',
  options: {
    collapsed: true,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Meta Title',
      type: 'string',
      placeholder: 'This will be used as the meta title on search engines',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      placeholder:
        'This will be used as the meta description on search engines',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'seoImage',
      title: 'Meta Image',
      type: 'image',
      description:
        'This will be used as the meta image on search engines and for social sharing',
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      placeholder: 'This will be used as the title for social sharing',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      placeholder: 'This will be used as the description for social sharing',
      validation: (Rule) => Rule.max(200),
    }),
  ],
})
