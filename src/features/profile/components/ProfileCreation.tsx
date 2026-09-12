import { useEffect, useRef, useState, type FormEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'
import { profileSchema, type ProfileFormValues } from '../schemas'
import type { CreateProfileInput } from '../types'

export type { CreateProfileInput } from '../types'

type ProfileCreationProps = {
  onCreated: (profile: CreateProfileInput, signal?: AbortSignal) => Promise<void>
}

function ProfileCreation({ onCreated }: ProfileCreationProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const requestController = useRef<AbortController | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
  })

  useEffect(() => () => requestController.current?.abort(), [])

  async function submitProfile(values: ProfileFormValues) {
    setErrorMessage('')
    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller

    try {
      await onCreated({
        ...values,
        photo: values.photo ?? null,
      }, controller.signal)
    } catch (error) {
      if (!controller.signal.aborted) {
        setErrorMessage(error instanceof Error ? error.message : 'We could not create your profile. Please try again.')
      }
    }
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(submitProfile)(event)
  }

  return (
    <section className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="profile-title">
      <div className="mb-5">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Welcome to Farm 360</p>
        <h1 id="profile-title" className="text-2xl font-semibold tracking-tight text-stone-950">Create your profile</h1>
        <p className="mt-1.5 text-sm leading-5 text-stone-500">Tell us a little about yourself to get started.</p>
      </div>

      <form className="space-y-3" onSubmit={submitForm} noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="User ID" htmlFor="userId">
            <input id="userId" type="text" autoComplete="username" placeholder="Create a User ID" aria-invalid={errors.userId ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('userId')} />
            {errors.userId && <p className="mt-1 text-xs text-red-600" role="alert">{errors.userId.message}</p>}
          </FormField>

          <FormField label="Password" htmlFor="password">
            <input id="password" type="password" autoComplete="new-password" placeholder="Create a password" aria-invalid={errors.password ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('password')} />
            {errors.password && <p className="mt-1 text-xs text-red-600" role="alert">{errors.password.message}</p>}
          </FormField>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="First name" htmlFor="firstName">
            <input id="firstName" type="text" autoComplete="given-name" placeholder="Enter your first name" aria-invalid={errors.firstName ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('firstName')} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600" role="alert">{errors.firstName.message}</p>}
          </FormField>

          <FormField label="Last name" htmlFor="lastName">
            <input id="lastName" type="text" autoComplete="family-name" placeholder="Enter your last name" aria-invalid={errors.lastName ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('lastName')} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600" role="alert">{errors.lastName.message}</p>}
          </FormField>
        </div>

        <FormField label="Mobile number" htmlFor="mobileNumber">
          <input id="mobileNumber" type="tel" autoComplete="tel" placeholder="Enter your mobile number" aria-invalid={errors.mobileNumber ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('mobileNumber')} />
          {errors.mobileNumber && <p className="mt-1 text-xs text-red-600" role="alert">{errors.mobileNumber.message}</p>}
        </FormField>

        <FormField label="Gender" htmlFor="gender">
          <select id="gender" defaultValue="" aria-invalid={errors.gender ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('gender')}>
            <option value="" disabled>Select your gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="mt-1 text-xs text-red-600" role="alert">{errors.gender.message}</p>}
        </FormField>

        <FormField label="City" htmlFor="city">
          <input id="city" type="text" autoComplete="address-level2" placeholder="Enter your city" aria-invalid={errors.city ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('city')} />
          {errors.city && <p className="mt-1 text-xs text-red-600" role="alert">{errors.city.message}</p>}
        </FormField>

        <FormField label="Email" htmlFor="email">
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={errors.email ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>}
        </FormField>

        <FormField label="Photo" htmlFor="photo">
          <input id="photo" type="file" accept="image/*" aria-invalid={errors.photo ? 'true' : 'false'} className="block h-9 w-full cursor-pointer rounded-lg border border-stone-300 bg-white text-xs text-stone-500 file:mr-3 file:border-0 file:border-r file:border-stone-300 file:bg-stone-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20" {...register('photo', { setValueAs: (value: FileList) => value?.[0] })} />
          {errors.photo && <p className="mt-1 text-xs text-red-600" role="alert">{errors.photo.message}</p>}
        </FormField>

        {errorMessage && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Creating profile...' : 'Create profile'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-emerald-700 hover:text-emerald-800">Sign in</Link>
      </p>
    </section>
  )
}

export default ProfileCreation
