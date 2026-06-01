export type Booking = {
  id: string
  start: string
  end?: string
  videoUrl: string
  appointment: {
    title: string
  }
}

export type Prescription = {
  id: string
  name: string
  dateCreated: string
  downloadUrl: string
}
