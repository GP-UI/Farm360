import axios from 'axios'
import { API_ENDPOINTS } from '../../../config/api'
import { apiClient, toApiError } from '../../../services/apiClient'
import type { LoginResponse } from '../types'
import type { UserProfile } from '../../profile/types'

export async function login(userId: string, password: string, signal?: AbortSignal) {
  try {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.login, { userId, password }, { signal })

    if (!response.data.success || !response.data.user) {
      throw new Error(response.data.message || 'Login failed.')
    }

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) throw error
    throw toApiError(error, 'Invalid User ID or Password.')
  }
}

export function profileFromLoginResponse(loginResponse: LoginResponse): UserProfile {
  return {
    userId: loginResponse.user.userId,
    firstName: loginResponse.user.firstName,
    lastName: loginResponse.user.lastName,
    mobileNumber: loginResponse.user.mobileNumber,
    gender: loginResponse.user.gender,
    city: loginResponse.user.city,
    email: loginResponse.user.email,
    photo: loginResponse.user.userPhoto ?? null,
  }
}
