const SEMBLE_URL = 'https://open.semble.io/graphql'

type SembleRequest = {
  query: string
  variables?: Record<string, unknown>
}

export async function sembleQuery(body: SembleRequest) {
  const response = await fetch(SEMBLE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': process.env.SEMBLE_API_KEY!,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) throw new Error(`Semble error: ${response.status}`)

  return response.json()
}
