import { Flex, Text, Stack, Inline, Label, Badge } from '@sanity/ui'
import { RiLink } from 'react-icons/ri'

export type MenuItemPreviewCellProps = {
  subtitle?: string
  title?: string
  subtext?: string
}

export function MenuItemPreviewCell({
  subtitle,
  title,
  subtext,
}: MenuItemPreviewCellProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      padding={2}
      style={{ cursor: 'pointer' }}
    >
      <Inline space={2}>
        <div className="svg relative flex h-[34px] w-[34px] overflow-hidden border border-black p-2 text-black">
          <RiLink />
        </div>
        {title && subtitle && (
          <Stack space={2}>
            <Label size={0}>{subtitle}</Label>
            {title && <Text size={1}>{title}</Text>}
          </Stack>
        )}
      </Inline>

      {subtext && (
        <Inline space={2}>
          <Stack space={2}>
            <Label size={0}></Label>
            <Text size={1}>{subtext}</Text>
          </Stack>
        </Inline>
      )}
    </Flex>
  )
}
