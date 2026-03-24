export type Booking = {
  id: string
  start: string
  end?: string
  videoUrl: string
  appointment: {
    title: string
  }
}
