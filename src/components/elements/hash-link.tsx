import AnchorLink from './anchor-link'

export const HashLink = ({ id }: { id: string }) => {
  return (
    <AnchorLink
      className="absolute top-0 left-0 z-50 p-2 text-[20px] opacity-0"
      href={`#${id}`}
    >
      #
    </AnchorLink>
  )
}
