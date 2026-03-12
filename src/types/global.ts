declare global {
  interface Window {
    scrollTimeout?: number
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export {}
