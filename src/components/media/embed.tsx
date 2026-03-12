// 'use client'

// import { getMediaEmbedUrl } from '~/utils/media'
// import { VimeoEmbed } from './vimeo-embed'
// import { YoutubeEmbed } from './youtube-embed'
// import { Embed as EmbedProps } from '@/types/elements'

// export const Embed = ({ type, url }: EmbedProps) => {
//   const embed = getMediaEmbedUrl(url)

//   return (
//     <>
//       {embed?.embedUrl && embed?.type === 'vimeo' && (
//         <VimeoEmbed
//           autoplay={false}
//           controls={true}
//           hasMedia={hasMedia}
//           {...embed}
//         />
//       )}
//       {embed?.embedUrl && embed?.type === 'youtube' && (
//         <YoutubeEmbed
//           autoplay={false}
//           controls={true}
//           hasMedia={hasMedia}
//           {...embed}
//         />
//       )}
//       {embed?.muxVideo && embed?.type === 'mux' && (
//         <MuxEmbed muxVideo={embed.muxVideo} />
//       )}
//       {embed?.url && embed?.type === 'vimeo' && (
//         <VimeoEmbed
//           autoplay={false}
//           controls={true}
//           hasMedia={!!image || !!muxVideo}
//           {...embed}
//         />
//       )}
//       {embed?.url && embed?.type === 'youtube' && (
//         <YoutubeEmbed
//           autoplay={false}
//           controls={true}
//           hasMedia={!!image || !!muxVideo}
//           {...embed}
//         />
//       )}
//     </>
//   )
// }
