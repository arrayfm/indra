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

export type InvoiceItem = {
  description: string
  qty: number
  unit_price: number
  line_total: number
}

export interface Invoice {
  reference: string
  amount: string
  items: InvoiceItem[]
  payment_link: string
  status: 'PAID' | 'UNPAID'
}

export interface HistoryItem {
  reference: string
  patient_email: string
  date_paid: string
  transaction_id: string
  financials: {
    subtotal: number
    delivery_fee: number
    total_paid: number
  }
  items: InvoiceItem[]
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

export interface BillingHistoryResponse extends GenericApiResponse {
  history: HistoryItem[]
}

export type ApiResponse =
  | FindPatientResponse
  | GenericApiResponse
  | InvoicesApiResponse
  | BillingHistoryResponse

export interface SuccessOutput {
  label?: string
  data: ApiResponse
}

export type QueryOutput = SuccessOutput | string | null
