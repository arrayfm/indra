import { typePPMori } from '@/lib/utils/font'
import { Section } from '../layout/section'
import { Media } from '../media/media'
import { cn } from '@/lib/utils/class-name'
import { Article } from '@/types/documents'
import { ConditionalLink } from '../elements/conditional-link'
import { Button } from '../ui/button'

const gridPlacement = (index: number) => {
  const placementIndex = index % 3
  switch (placementIndex) {
    case 1:
      return 'col-span-10 md:col-span-3 md:col-start-8 md:row-start-2 row-span-2'
    case 2:
      return 'col-span-10 md:col-span-4 md:col-start-6 md:row-start-4'
    case 0:
    default:
      return 'col-span-10 md:col-span-6 row-span-2'
  }
}

export const ArticleGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <Section id="articles" className="pt-12">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-32">
        {articles.map((article, index) => (
          <ConditionalLink
            key={article._id}
            className={cn(gridPlacement(index), 'group flex flex-col gap-5')}
            href={article.path}
          >
            {article.media?.[0] && (
              <div className="flex max-h-120 items-center justify-center">
                <Media {...article.media?.[0]} />
              </div>
            )}
            {article.title && (
              <h2 className={cn(typePPMori({ size: 'xl' }))}>
                {article.title}
              </h2>
            )}
            <Button className="w-fit">Explore</Button>
          </ConditionalLink>
        ))}
      </div>
    </Section>
  )
}
