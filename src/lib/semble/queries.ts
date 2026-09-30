const OLDEST_DATE = new Date('1900-01-01').toISOString()
const NEWEST_DATE = new Date(
  Date.now() + 365 * 24 * 60 * 60 * 1000 * 10
).toISOString()

export const GET_PATIENT_BY_EMAIL = (email: string) => ({
  query: `
    query GetPatientByEmail($search: String, $pagination: Pagination) {
      patients(search: $search, pagination: $pagination) {
        data { id firstName lastName email dob }
      }
    }
  `,
  variables: {
    search: email,
    pagination: { page: 1, pageSize: 1 },
  },
})

export const GET_PATIENT_BOOKINGS = (patientId: string) => ({
  query: `
    query GetPatientBookings($patientId: ID!, $start: Date!, $end: Date!) {
      patient(id: $patientId) {
        bookings(start: $start, end: $end) {
          id
          start
          end
          videoUrl
          appointment { title }
        }
      }
    }
  `,
  variables: {
    patientId,
    start: OLDEST_DATE,
    end: NEWEST_DATE,
  },
})

export const GET_PATIENT_PRESCRIPTIONS = (patientId: string) => ({
  query: `
    query GetPatientPrescriptions($patientId: ID!) {
      patient(id: $patientId) {
        patientDocuments {
          data {
            id
            name
            dateCreated
            downloadUrl
          }
        }
      }
    }
  `,
  variables: { patientId },
})
