import { useFormValue } from 'sanity'
import { useEffect, useState } from 'react'
import { Stack, Text } from '@sanity/ui'
import { sanityFetch } from '../lib/fetch'
import { getArticleByResourceId } from '../queries/get-article'
import { Article } from '@/types/documents'
import { Media } from '@/components/media/media'

type ArticleProps = Pick<
  Article,
  '_id' | 'title' | 'slug' | 'path' | 'media'
> | null

export function ResourceUsedInArticle(props: any) {
  const [article, setArticle] = useState<ArticleProps>(null)

  const id = (useFormValue(['_id']) as string)?.replace('drafts.', '')

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return
      const parentArticle = (await sanityFetch({
        query: getArticleByResourceId,
        params: { resourceId: id },
      })) as ArticleProps
      setArticle(parentArticle)
    }
    fetchArticle()
  }, [id])

  if (!article)
    return (
      <Text size={1} muted>
        Not used in any module yet
      </Text>
    )

  return (
    <a
      href={`/studio/structure/orderable-article;${article._id}`}
      className="border-muted bg-popover flex items-center gap-3 rounded border p-3"
    >
      {article?.media?.[0] && (
        <div className="relative h-[34px] w-[34px] overflow-hidden">
          <Media {...article.media?.[0]} cover />
        </div>
      )}
      <Stack space={2}>
        <Text size={1} muted>
          Used in
        </Text>
        <Text size={1} weight="semibold">
          {article.title}
        </Text>
      </Stack>
    </a>
  )
}
