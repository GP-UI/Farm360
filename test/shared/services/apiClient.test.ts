import axios, { type InternalAxiosRequestConfig } from 'axios'
import { describe, expect, it } from 'vitest'
import { getApiErrorMessage, toApiError } from '../../../src/shared/services/apiClient'

describe('getApiErrorMessage', () => {
  it('prefers a server-provided message', () => {
    const error = new axios.AxiosError('Request failed', 'ERR_BAD_REQUEST')
    error.response = {
      status: 422,
      statusText: 'Unprocessable Entity',
      headers: {},
      config: { headers: {} } as InternalAxiosRequestConfig,
      data: { message: 'User ID is already registered.' },
    }

    expect(getApiErrorMessage(error, 'Fallback')).toBe('User ID is already registered.')
    expect(toApiError(error, 'Fallback').status).toBe(422)
  })

  it('returns a connection message when there is no response', () => {
    const error = new axios.AxiosError('Network Error')

    expect(getApiErrorMessage(error, 'Fallback')).toBe('Unable to connect to the server. Please try again.')
  })
})
