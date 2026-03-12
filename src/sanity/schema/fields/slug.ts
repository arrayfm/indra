import { defineField } from 'sanity'
import slugify from 'slugify'

interface CreateSlugFieldOptions {
  name?: string
  slugSource?: string
  includeGroup?: boolean
}

const hiddenSlugs = ['home']

export const createSlugField = ({
  name = 'slug',
  slugSource = 'title',
  includeGroup = true,
}: CreateSlugFieldOptions = {}) => {
  return defineField({
    name,
    type: 'slug',
    title: 'Slug',
    group: includeGroup ? 'content' : '',
    options: slugSource
      ? {
          source: slugSource,
          slugify: (input: string) =>
            slugify(input, { lower: true, strict: true }),
        }
      : undefined,
    validation: (Rule) => Rule.required(),
    hidden: ({ parent, document }) => {
      // @ts-ignore
      if (hiddenSlugs.includes(document?.slug?.current)) return true

      return false
    },
  })
}
