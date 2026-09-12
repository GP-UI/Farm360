import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Login from '../../../../src/features/auth/components/Login'

describe('Login', () => {
  it('shows field errors before sending an invalid form', async () => {
    const onLogin = vi.fn()

    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>,
    )

    fireEvent.submit(screen.getByRole('button', { name: 'Login' }).closest('form')!)

    expect(await screen.findByText('User ID is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
    expect(onLogin).not.toHaveBeenCalled()
  })

  it('submits validated credentials', async () => {
    const onLogin = vi.fn().mockResolvedValue(undefined)

    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('User ID'), { target: { value: 'farmer-1' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }).closest('form')!)

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith('farmer-1', 'secret', expect.any(AbortSignal)))
  })
})
