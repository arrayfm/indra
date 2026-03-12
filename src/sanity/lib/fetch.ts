import { client } from './client'

interface SanityFetchProps {
  query: string
  params?: Record<string, any>
  tags?: string[]
}

export const sanityFetch = async ({
  query,
  params = {},
  tags = [],
}: SanityFetchProps) => {
  return await client.fetch(query, params, {
    cache: 'no-store',
    // next: {
    //   revalidate: 60,
    // },
  })
}
