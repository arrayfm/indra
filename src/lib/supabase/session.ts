import { createClient } from './server'

export async function getUser() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  return user.data.user
}
