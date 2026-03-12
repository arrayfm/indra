import { Image } from '../ui/image'
import { Video } from '../ui/video'

export const Media = ({ ...props }) => {
  switch (props._type) {
    case 'image':
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image {...props} />
    case 'video':
      return <Video {...props} />
    default:
      return <div>Unsupported media type</div>
  }
}
