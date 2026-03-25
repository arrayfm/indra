import {
  ApiResponse,
  FindPatientResponse,
  InvoicesApiResponse,
  Patient,
  QueryEndpoint,
} from '@/types/azure'
import { azureQuery } from './client'

function isFindPatientResponse(
  endpoint: QueryEndpoint,
  data: ApiResponse
): data is FindPatientResponse {
  return (
    endpoint === 'find_patient' && 'success' in data && data.success === true
  )
}

export async function findAzurePatient(email: string): Promise<Patient> {
  const data = await azureQuery('find_patient', { email })

  if (!isFindPatientResponse('find_patient', data)) {
    throw new Error('Patient not found or unexpected response shape')
  }

  return data.patient
}

export async function getAzureBookings(
  patientId: string
): Promise<ApiResponse> {
  return azureQuery('get_bookings', { patientId })
}

export async function getAzureScripts(patientId: string): Promise<ApiResponse> {
  return azureQuery('get_scripts', { patientId })
}

export async function getAzureInvoices(
  email: string
): Promise<InvoicesApiResponse> {
  return azureQuery('get_invoices', { email }) as Promise<InvoicesApiResponse>
}

export async function getAzureBillingHistory(
  email: string
): Promise<ApiResponse> {
  return azureQuery('get_billing_history', { email })
}
