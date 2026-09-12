import { useNavigate } from 'react-router-dom'
import Footer from '../shared/components/Footer'
import Header from '../shared/components/Header'
import { useNotification } from '../shared/hooks/notificationContext'
import type { CreateProfileInput } from '../features/profile/types'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/themeContext'
import AppRoutes from '../routes'

function AppShell() {
  const { profile, isAuthenticated, login, createProfile, logout } = useAuth()
  const navigate = useNavigate()
  const { notify } = useNotification()
  const { mode, resolvedTheme, setMode } = useTheme()

  const handleProfileCreation = async (createdProfile: CreateProfileInput, signal?: AbortSignal) => {
    await createProfile(createdProfile, signal)
    notify({ type: 'success', message: 'Profile created successfully.' })
    navigate('/dashboard')
  }

  const handleLogin = async (userId: string, password: string, signal?: AbortSignal) => {
    const message = await login(userId, password, signal)
    notify({ type: 'success', message })
    navigate('/dashboard')
  }

  const handleLogout = () => {
    logout()
    notify({ type: 'success', message: 'You have been logged out.' })
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header
        hasProfile={profile !== null}
        profilePhoto={profile?.photo ?? null}
        onProfileClick={() => navigate('/profile/create')}
        onLogout={handleLogout}
        themeMode={mode}
        resolvedTheme={resolvedTheme}
        onThemeChange={setMode}
      />

      <main className="flex min-h-[calc(100vh-9rem)] flex-1 items-start justify-center px-5 pb-5 pt-30 sm:px-8 sm:pb-16 sm:pt-30">
        <AppRoutes
          profile={profile}
          onProfileCreation={handleProfileCreation}
          onLogin={handleLogin}
          isAuthenticated={isAuthenticated}
        />
      </main>

      <Footer />
    </div>
  )
}

export default AppShell
