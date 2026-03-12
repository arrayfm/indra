import {
  PortableTextBlock as PortableTextBlockType,
  PortableTextMarkComponentProps,
} from 'next-sanity'
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextTypeComponentProps,
} from '@portabletext/react'
import { cn } from '@/lib/utils/class-name'
import { AnimatedComponent } from '@/components/layout/animated-component'
import { ConditionalLink } from './conditional-link'
import { Link } from '@/types/elements'

export type PortableTextBlockProps = {
  text?: PortableTextBlockType[]
  className?: string
}

type TableRow = {
  _type: 'tableRow'
  cells: string[]
}

export type TableBlock = {
  _type: 'table'
  rows: TableRow[]
}

export type LinkMark = {
  _type: 'link'
} & Link

const textComponents = {
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
      const { href, blank, file } = value || { blank: false }

      return (
        <ConditionalLink
          as="span"
          href={href}
          file={file}
          target={blank ? '_blank' : '_self'}
        >
          {children}
        </ConditionalLink>
      )
    },
  },
  block: {
    h6: ({
      children,
      value,
    }: PortableTextComponentProps<PortableTextBlockType>) => (
      <AnimatedComponent id={value._key} as="h6">
        {children}
      </AnimatedComponent>
    ),
    normal: ({
      children,
      value,
    }: PortableTextComponentProps<PortableTextBlockType>) => (
      <AnimatedComponent id={value._key} as="p">
        {children}
      </AnimatedComponent>
    ),
  },
  list: {
    bullet: ({
      children,
      value,
    }: PortableTextComponentProps<PortableTextBlockType>) => (
      <AnimatedComponent id={value._key} as="ul" className="list-disc pl-5">
        {children}
      </AnimatedComponent>
    ),
    number: ({
      children,
      value,
    }: PortableTextComponentProps<PortableTextBlockType>) => (
      <AnimatedComponent id={value._key} as="ol" className="list-decimal pl-5">
        {children}
      </AnimatedComponent>
    ),
  },
}

export const PortableTextBlock = ({
  text,
  className,
}: PortableTextBlockProps) => {
  if (!text) return null

  return (
    <div id="text" className={cn('text', className)}>
      <PortableText value={text} components={textComponents} />
    </div>
  )
}
