import { supabaseAdmin } from './admin'

export const getProfile = async (userId?: string) => {
  if (!userId) return null

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}
