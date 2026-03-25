import { ApiResponse, QueryEndpoint, QueryPayload } from '@/types/azure'

const AZURE_BASE_URL = process.env.AZURE_BASE_URL ?? ''

export async function azureQuery(
  endpoint: QueryEndpoint,
  payload: QueryPayload
): Promise<ApiResponse> {
  if (!AZURE_BASE_URL)
    throw new Error('AZURE_BASE_URL is not defined in environment variables')

  const res = await fetch(`${AZURE_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Server returned ${res.status} for ${endpoint}`)
  return res.json() as Promise<ApiResponse>
}
