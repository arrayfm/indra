import AnchorLink from './anchor-link'

export const HashLink = ({ id }: { id: string }) => {
  return (
    <AnchorLink
      className="absolute left-0 top-0 z-50 p-2 text-[20px] opacity-0 hover:opacity-100"
      href={`#${id}`}
    >
      #
    </AnchorLink>
  )
}
