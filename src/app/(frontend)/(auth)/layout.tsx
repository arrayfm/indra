import { getUser } from '@/lib/supabase/session'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const user = await getUser()

  // if (user) {
  //   redirect('/')
  // }

  return <>{children}</>
}
