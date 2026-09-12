import axios from 'axios'
import { API_BASE_URL } from '../config/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class ApiError extends Error {
  status: number | undefined

  constructor(message: string, status?: number, options?: ErrorOptions) {
    super(message, options)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message
    if (typeof serverMessage === 'string' && serverMessage.trim()) {
      return serverMessage
    }

    if (!error.response) {
      return 'Unable to connect to the server. Please try again.'
    }
  }

  return fallbackMessage
}

export function toApiError(error: unknown, fallbackMessage: string) {
  return new ApiError(getApiErrorMessage(error, fallbackMessage), getApiErrorStatus(error), { cause: error })
}

function getApiErrorStatus(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.status : undefined
}
