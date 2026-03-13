import { getPage } from '@/sanity/queries/get-page'
import { getMetaData } from '@/lib/core/seo'
import { Metadata } from 'next'
import { Article, Page } from '@/types/documents'
import { sanityFetch } from '@/sanity/lib/fetch'
import { getArticles } from '@/sanity/queries/get-article'
import { Section } from '@/components/layout/section'
import { typePPMori } from '@/lib/utils/font'
import { BackLink } from '@/components/elements/back-link'
import { cn } from '@/lib/utils/class-name'
import { nl2br } from '@/lib/utils/string'
import { Media } from '@/components/media/media'
import { Hero } from '@/components/layout/hero'

export const generateMetadata = async (): Promise<Metadata> => {
  return await getMetaData({
    type: 'page',
    slug: 'modules',
  })
}

export default async function Articles() {
  const page = (await sanityFetch({
    query: getPage,
    params: { type: 'page', path: '/modules' },
  })) as Page

  const articles = (await sanityFetch({
    query: getArticles,
  })) as Article[]

  return (
    <main className="min-h-screen-header">
      <Hero {...page} />
      {/* <Section id="articles" className="pt-12">
        <div className="container grid grid-cols-10 gap-2.5">
          {articles.map((article) => (
            <div
              key={article._id}
              className="col-span-10 md:col-span-5 lg:col-span-3"
            >
              <Media {...article.resources?.[0]?.media[0]} />
              <h2 className={cn(typePPMori({ size: 'xl' }))}>
                {article.title}
              </h2>
            </div>
          ))}
        </div>
      </Section> */}
    </main>
  )
}
