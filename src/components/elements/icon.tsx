import { Icon as IconProp, renderIcon } from '@/lib/utils/icon'

export const Icon = ({ name }: { name?: IconProp }) => {
  if (!name) return null
  return renderIcon(name)
}
