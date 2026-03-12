import { PortableTextBlock } from 'next-sanity'

export const nl2br = (str?: string) => {
  if (!str) return null
  return str.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ))
}

export const contains = (str?: string, search?: string): boolean => {
  if (!str || !search) return false

  return str.toLowerCase().includes(search.toLowerCase())
}

export const stripBaseUrl = (url?: string) => {
  if (!url) return ''

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) return url

  return url.replace(baseUrl, '')
}

export const getRelativePath = (url: string | null) => {
  if (!url) return ''

  return url.replace(/^(?:\/\/|[^/]+)*\//, '')
}

export const replaceCharacterInString = (
  str: string,
  char: string,
  replacer: string
) => {
  return str.replace(char, replacer)
}

export const slugify = (id?: string): string => {
  if (!id) return ''

  return id
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, '')
}

export type BlockChild = {
  _type: string
  text: string
}

type Block = {
  _type: string
  children?: BlockChild[]
}

type Options = {
  nonTextBehavior: 'remove' | 'keep'
}

export const blocksToPlainText = (
  blocks?: Block[] | PortableTextBlock[],
  options: Options = {
    nonTextBehavior: 'remove',
  }
): string => {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block: Block | PortableTextBlock) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children
        .map((child: BlockChild | any) => child.text)
        .join('')
    })
    .join('\n\n')
}

export const truncate = (str?: string, length = 200) => {
  if (!str) return ''
  if (str.length <= length) return str

  let truncated = str.slice(0, length).trimEnd()
  const lastChar = truncated[truncated.length - 1]

  if (['.', '?', '!'].includes(lastChar)) {
    return truncated
  }

  return truncated + '...'
}

export const getRandomValueFromArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const checkIfStringIsUrl = (str: string) => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export const convertToArray = (
  value: string | string[] | undefined
): string[] => {
  if (Array.isArray(value)) {
    return value
  } else if (typeof value === 'string') {
    return [value]
  } else {
    return []
  }
}

export const extractPhoneNumber = (input?: string): string => {
  if (!input) return ''

  const digitsOnly = input.replace(/[^\d+]/g, '')

  const cleaned = digitsOnly.replace(/\+44(?:0)?/, '+44')

  return cleaned
}
