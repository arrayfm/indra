import { Image } from '../ui/image'

export const Media = ({ ...props }) => {
  switch (props._type) {
    case 'image':
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image {...props} />
    default:
      return <div>Unsupported media type</div>
  }
}
