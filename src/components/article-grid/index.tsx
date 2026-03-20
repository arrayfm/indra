import { Section } from '../layout/section'
import { Article } from '@/types/documents'
import { ArticleCard } from './article-card'

const ArticleGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <Section id="articles" className="pt-12">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-24 md:gap-y-32">
        {articles.map((article, index) => (
          <ArticleCard key={article._id} index={index} {...article} />
        ))}
      </div>
    </Section>
  )
}

export default ArticleGrid
