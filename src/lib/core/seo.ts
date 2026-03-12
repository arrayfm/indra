import { getSeo } from '@/sanity/queries/get-seo'
import { SiteSettings } from '@/types/documents'
import { BlockChild, blocksToPlainText } from '@/lib/utils/string'
import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'

export const generateOrganizationData = (data: SiteSettings) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data?.title || 'Hive',
    description: data?.description || '',
    logo: data?.logo?.url || '',
    telephone: data?.phone || '',
    email: data?.email || '',
    sameAs: data?.social?.map((social) => social.url) || [],
  }
}

export const convertSeoDescription = (
  description?: string | BlockChild[]
): string => {
  if (!description) return ''

  let plainTextDescription = description

  if (Array.isArray(description))
    plainTextDescription = blocksToPlainText(description)

  const truncatedDescription =
    plainTextDescription && plainTextDescription.length > 200
      ? `${plainTextDescription.slice(0, 200)}...`
      : (plainTextDescription as string)

  return truncatedDescription
}

export const getMetaData = async (params: {
  type: 'page'
  slug: string
}): Promise<Metadata> => {
  const seo = (await sanityFetch({
    query: getSeo,
    params,
  })) as any
  if (!seo) return {}

  return {
    title: seo.title,
    description: convertSeoDescription(seo.description),

    openGraph: {
      title: seo.socialTitle,
      description: convertSeoDescription(seo.socialDescription),
      type: getOgType(params.type),
      images: [seo.image],
    },

    twitter: {
      title: seo.socialTitle,
      description: convertSeoDescription(seo.socialDescription),
      images: [seo.image],
    },

    other: {
      dateModified: seo.modifiedDate,
      datePublished: seo.publishDate,
    },
  }
}

const getOgType = (type: string) => {
  switch (type) {
    case 'article':
      return 'article'
    case 'page':
    default:
      return 'website'
  }
}
