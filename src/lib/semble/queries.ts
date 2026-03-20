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
      appointments(patientId: "${patientId}", pagination: { page: 1, pageSize: 50 }) {
        data { id date time status }
      }
    }
  `,
})

export const GET_PATIENT_SCRIPTS = (patientId: string) => ({
  query: `
    query {
      prescriptions(patientId: "${patientId}") {
        data { id medication dosage issuedAt }
      }
    }
  `,
})
