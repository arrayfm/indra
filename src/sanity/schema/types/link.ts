import { RiLink } from 'react-icons/ri'
import { defineField, defineType } from 'sanity'

const internalLinkField = defineField({
  title: 'Internal Link',
  name: 'internalLink',
  description: 'Select pages for navigation',
  type: 'reference',
  to: [{ type: 'page' }],
  hidden: ({ parent }) => !!parent?.externalUrl || !!parent?.file,
})

const externalUrlField = defineField({
  name: 'externalUrl',
  title: 'External URL',
  description: 'Use fully qualified URLS for external link',
  type: 'string',
  hidden: ({ parent }) => !!parent?.internalLink || !!parent?.file,
  validation: (Rule) =>
    Rule.custom((url) => {
      if (!url) return true
      const isValidUrl = /^(\/|http|https|mailto|tel):?/.test(url)
      const isAnchorLink = /^#/.test(url)

      if (isValidUrl || isAnchorLink) {
        return true
      }

      return 'Please enter a valid URL'
    }),
})

const fileField = defineField({
  name: 'file',
  type: 'file',
  description: 'Accepts PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT',
  options: {
    accept:
      'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain',
  },
  hidden: ({ parent }) => !!parent?.internalLink || !!parent?.externalUrl,
})

export const link = defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: RiLink,
  fields: [
    internalLinkField,
    externalUrlField,
    fileField,
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      hidden: ({ parent }) =>
        !parent?.externalUrl && !parent?.internalLink && !parent?.file,
    }),
  ],
})

export const blockLinkFields = [
  internalLinkField,
  externalUrlField,
  fileField,
  defineField({
    title: 'Open in new tab',
    name: 'blank',
    type: 'boolean',
  }),
]
