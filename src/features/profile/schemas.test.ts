import { describe, expect, it } from 'vitest'
import { profileSchema } from './schemas'

describe('profileSchema', () => {
  const validProfile = {
    userId: 'farmer-1',
    password: 'long-enough-password',
    firstName: 'Shreeja',
    lastName: 'Farm',
    mobileNumber: '9876543210',
    gender: 'female',
    city: 'Pune',
    email: 'farmer@example.com',
  }

  it('rejects non-image uploads', () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      photo: new File(['not an image'], 'profile.txt', { type: 'text/plain' }),
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Profile photo must be an image.')
    }
  })

  it('rejects a short password and oversized photo', () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      password: 'short',
      photo: new File([new Uint8Array(6 * 1024 * 1024)], 'profile.jpg', { type: 'image/jpeg' }),
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toEqual([
        'Password must be at least 8 characters.',
        'Photo must be smaller than 5 MB.',
      ])
    }
  })
})
