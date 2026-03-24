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
  date: string
  drugs: {
    drug?: string
  }[]
  pdfDownloadUrl: string
}
