import type { UserProfile } from '../../features/profile/types'

const PROFILE_STORAGE_KEY = 'shreeja_farm_profile'

type StoredProfile = UserProfile

export function saveProfile(profile: UserProfile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  } catch {
    return
  }
}

function isStoredProfile(value: unknown): value is StoredProfile {
  if (!value || typeof value !== 'object') return false
  const profile = value as Record<string, unknown>
  return ['userId', 'firstName', 'lastName', 'mobileNumber', 'gender', 'city', 'email'].every(
    (key) => typeof profile[key] === 'string',
  ) && (typeof profile.photo === 'string' || profile.photo === null)
}

export function getStoredProfile(): UserProfile | null {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!storedProfile) return null

    const profile: unknown = JSON.parse(storedProfile)
    if (!isStoredProfile(profile)) {
      localStorage.removeItem(PROFILE_STORAGE_KEY)
      return null
    }
    return profile
  } catch {
    localStorage.removeItem(PROFILE_STORAGE_KEY)
    return null
  }
}

export function clearStoredProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY)
  } catch {
    return
  }
}
