import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RouteLoading from '../shared/components/RouteLoading'
import { createDashboardRoute } from '../features/dashboard/routes'
import type { CreateProfileInput, UserProfile } from '../features/profile/types'
import { ROUTE_PATHS } from './paths'

const Login = lazy(() => import('../features/auth/components/Login'))
const ProfileCreation = lazy(() => import('../features/profile/components/ProfileCreation'))

type AppRoutesProps = {
  profile: UserProfile | null
  onProfileCreation: (profile: CreateProfileInput, signal?: AbortSignal) => Promise<void>
  onLogin: (userId: string, password: string, signal?: AbortSignal) => Promise<void>
  isAuthenticated: boolean
}

function AppRoutes({ profile, onProfileCreation, onLogin, isAuthenticated }: AppRoutesProps) {
  const authenticatedPath = ROUTE_PATHS.dashboard
  const entryPath = isAuthenticated ? authenticatedPath : ROUTE_PATHS.login

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route
          path={ROUTE_PATHS.login}
          element={isAuthenticated ? <Navigate to={authenticatedPath} replace /> : <Login onLogin={onLogin} />}
        />
        <Route
          path={ROUTE_PATHS.profileCreate}
          element={<ProfileCreation onCreated={onProfileCreation} />}
        />
        {createDashboardRoute({ profile, isAuthenticated })}
        <Route path="*" element={<Navigate to={entryPath} replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
