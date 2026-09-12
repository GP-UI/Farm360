import { z } from 'zod'

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required.`)

export const profileSchema = z.object({
  userId: requiredText('User ID'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  firstName: requiredText('First name'),
  lastName: requiredText('Last name'),
  mobileNumber: z.string().trim().regex(/^[0-9+()\-\s]{7,20}$/, 'Enter a valid mobile number.'),
  gender: z.enum(['female', 'male', 'non-binary', 'prefer-not-to-say'], {
    error: 'Select your gender.',
  }),
  city: requiredText('City'),
  email: z.email('Enter a valid email address.'),
  photo: z.file({ error: 'Profile photo is required.' })
    .refine((file) => file.type.startsWith('image/'), 'Profile photo must be an image.')
    .max(5 * 1024 * 1024, 'Photo must be smaller than 5 MB.'),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
