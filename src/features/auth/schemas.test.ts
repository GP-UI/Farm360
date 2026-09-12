import { describe, expect, it } from 'vitest'
import { loginSchema } from './schemas'

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    expect(loginSchema.safeParse({ userId: 'farmer-1', password: 'secret' }).success).toBe(true)
  })

  it('rejects missing credentials', () => {
    const result = loginSchema.safeParse({ userId: '', password: '' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toEqual([
        'User ID is required.',
        'Password is required.',
      ])
    }
  })
})
