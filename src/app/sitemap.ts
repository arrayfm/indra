import { sanityFetch } from '@/sanity/lib/fetch'
import { getSitemap } from '@/sanity/queries/get-sitemap'
import { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapData = await sanityFetch({
    query: getSitemap,
  })

  return [
    ...sitemapData.sitemap.map((entity: any) => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      let url = baseUrl

      if (entity.path === '/home') {
        url += `/`
      } else {
        url += `${entity.path}`
      }

      return {
        url: url,
        lastModified: new Date(entity.lastModified),
      }
    }),
  ]
}

export default sitemap
