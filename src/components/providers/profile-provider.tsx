'use client'

import { Profile } from '@/types/supabase'
import { createContext, useContext } from 'react'

const ProfileContext = createContext<Profile | null>(null)

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile | null
  children: React.ReactNode
}) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
