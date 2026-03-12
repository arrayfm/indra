import React from 'react'
import { PreviewProps } from 'sanity'

type VideoPreviewProps = PreviewProps & {
  value?: {
    asset?: {
      url?: string
    }
    title?: string
  }
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ value }) => {
  const videoUrl = value?.asset?.url
  const title = value?.title || 'Video Preview'

  if (!videoUrl) {
    return <div>No video uploaded</div>
  }

  return (
    <div>
      <p>{title}</p>
      <video
        src={videoUrl}
        controls
        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
      />
    </div>
  )
}

export default VideoPreview
