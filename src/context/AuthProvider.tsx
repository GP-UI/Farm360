import { useMutation } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearProfile, setProfile } from '../store/authSlice'
import { AuthContext } from './AuthContext'
import type { CreateProfileInput, UserProfile } from '../features/profile/types'
import { fileToBase64 } from '../shared/services/fileService'
import { clearStoredProfile, saveProfile } from '../shared/services/authStorage'
import { login as loginRequest, profileFromLoginResponse } from '../features/auth/services/authService'
import { createProfile as createProfileRequest } from '../features/profile/services/profileService'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const profile = useAppSelector((state) => state.auth.profile)
  const dispatch = useAppDispatch()

  const loginMutation = useMutation({
    mutationFn: async ({ userId, password, signal }: { userId: string; password: string; signal?: AbortSignal }) => {
      const loginResult = await loginRequest(userId, password, signal)
      const loggedInProfile = profileFromLoginResponse(loginResult)

      dispatch(setProfile(loggedInProfile))
      saveProfile(loggedInProfile)
      return loginResult.message || 'Login successful.'
    },
  })

  const createProfileMutation = useMutation({
    mutationFn: async ({ profileToCreate, signal }: { profileToCreate: CreateProfileInput; signal?: AbortSignal }) => {
      const photoBase64 = profileToCreate.photo
        ? await fileToBase64(profileToCreate.photo)
        : null

      await createProfileRequest(profileToCreate, photoBase64, signal)

      const savedProfile: UserProfile = {
        userId: profileToCreate.userId,
        firstName: profileToCreate.firstName,
        lastName: profileToCreate.lastName,
        mobileNumber: profileToCreate.mobileNumber,
        gender: profileToCreate.gender,
        city: profileToCreate.city,
        email: profileToCreate.email,
        photo: photoBase64,
      }
      dispatch(setProfile(savedProfile))
      saveProfile(savedProfile)
    },
  })

  function login(userId: string, password: string, signal?: AbortSignal) {
    return loginMutation.mutateAsync({ userId, password, signal })
  }

  function createProfile(profileToCreate: CreateProfileInput, signal?: AbortSignal) {
    return createProfileMutation.mutateAsync({ profileToCreate, signal })
  }

  function logout() {
    clearStoredProfile()
    dispatch(clearProfile())
  }

  return (
    <AuthContext value={{
      profile,
      isAuthenticated: profile !== null,
      login,
      createProfile,
      logout,
    }}>
      {children}
    </AuthContext>
  )
}
