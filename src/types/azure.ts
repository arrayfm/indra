export type ApiStatus = 'checking' | 'online' | 'offline'
export type OutputStatus = 'idle' | 'loading' | 'success' | 'error'

export type QueryEndpoint =
  | 'find_patient'
  | 'get_bookings'
  | 'get_scripts'
  | 'get_invoices'
  | 'get_billing_history'

export type FindPatientPayload = { email: string }
export type PatientIdPayload = { patientId: string }
export type BillingEmailPayload = { email: string }
export type QueryPayload =
  | FindPatientPayload
  | PatientIdPayload
  | BillingEmailPayload

export interface Patient {
  id: string
  email: string
  [key: string]: unknown
}

export interface Invoice {
  reference: string
  amount: string
  items: {
    description: string
    qty: string
    unit_price: number
    line_total: number
  }[]
  payment_link: string
  status: 'PAID' | 'UNPAID'
}

export interface FindPatientResponse {
  success: true
  patient: Patient
}

export interface GenericApiResponse {
  success?: boolean
  [key: string]: unknown
}

export interface InvoicesApiResponse extends GenericApiResponse {
  invoices: Invoice[]
}

export type ApiResponse =
  | FindPatientResponse
  | GenericApiResponse
  | InvoicesApiResponse

export interface SuccessOutput {
  label?: string
  data: ApiResponse
}

export type QueryOutput = SuccessOutput | string | null
