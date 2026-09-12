import { useEffect, useRef, useState, type FormEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormField from '../../../components/ui/FormField'
import { loginSchema, type LoginFormValues } from '../schemas'

type LoginProps = {
  onLogin: (userId: string, password: string, signal?: AbortSignal) => Promise<void>
}

function Login({ onLogin }: LoginProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const requestController = useRef<AbortController | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  useEffect(() => () => requestController.current?.abort(), [])

  async function submitLogin({ userId, password }: LoginFormValues) {
    setErrorMessage('')
    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller

    try {
      await onLogin(userId, password, controller.signal)
    } catch (error) {
      if (!controller.signal.aborted) {
        setErrorMessage(error instanceof Error ? error.message : 'Invalid User ID or Password. Please try again.')
      }
    }
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(submitLogin)(event)
  }

  return (
    <section className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="login-title">
      <div className="mb-5">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Farm 360</p>
        <h1 id="login-title" className="text-2xl font-semibold tracking-tight text-stone-950">Welcome back</h1>
        <p className="mt-1.5 text-sm leading-5 text-stone-500">Sign in to continue to your account.</p>
      </div>

      <form className="space-y-4" onSubmit={submitForm} noValidate>
        <FormField label="User ID" htmlFor="login-userId">
          <input id="login-userId" type="text" autoComplete="username" placeholder="Enter your User ID" aria-invalid={errors.userId ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('userId')} />
          {errors.userId && <p className="mt-1 text-xs text-red-600" role="alert">{errors.userId.message}</p>}
        </FormField>

        <FormField label="Password" htmlFor="login-password">
          <input id="login-password" type="password" autoComplete="current-password" placeholder="Enter your password" aria-invalid={errors.password ? 'true' : 'false'} className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" {...register('password')} />
          {errors.password && <p className="mt-1 text-xs text-red-600" role="alert">{errors.password.message}</p>}
        </FormField>

        {errorMessage && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-500">
        New to Farm 360?{' '}
        <Link to="/profile/create" className="font-medium text-emerald-700 hover:text-emerald-800">Sign up</Link>
      </p>
    </section>
  )
}

export default Login
