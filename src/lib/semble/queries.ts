const OLDEST_DATE = new Date('1900-01-01').toISOString()
const NEWEST_DATE = new Date(
  Date.now() + 365 * 24 * 60 * 60 * 1000 * 10
).toISOString()

export const GET_PATIENT_BY_EMAIL = (email: string) => ({
  query: `
    query {
      patients(search: "${email}", pagination: { page: 1, pageSize: 1 }) {
        data { id firstName lastName email dob }
      }
    }
  `,
})

export const GET_PATIENT_BOOKINGS = (patientId: string) => ({
  query: `
    query {
      patient(id: "${patientId}") {
        bookings (start: "${OLDEST_DATE}", end: "${NEWEST_DATE}") {
          id
          start
          end
          videoUrl
          appointment { title }
        }
      }
    }
  `,
})

export const GET_PATIENT_PRESCRIPTIONS = (patientId: string) => ({
  query: `
   query {
      patient(id: "${patientId}") {
        prescriptions {
          data { 
            id
            drugs {
              drug 
            }
            date
            pdfDownloadUrl
          }
        }
      }
    }
  `,
})
