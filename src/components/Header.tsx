import { Link } from 'react-router-dom'
import type { ResolvedTheme, ThemeMode } from '../context/themeContext'

type HeaderProps = {
  hasProfile: boolean
  profilePhoto: string | null
  onProfileClick: () => void
  onLogout: () => void
  themeMode: ThemeMode
  resolvedTheme: ResolvedTheme
  onThemeChange: (mode: ThemeMode) => void
}

function Header({ hasProfile, profilePhoto, onProfileClick, onLogout, themeMode, resolvedTheme, onThemeChange }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
      <Link to="/" className="flex items-center gap-3" aria-label="Farm 360 home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 20V10" strokeLinecap="round" />
              <path d="M12 14c-4 0-6.5-2.2-7-6 4.3-.2 7 1.7 7 6Z" />
              <path d="M12 11c.3-4.1 2.8-6.4 7-7-.1 4.3-2.4 6.8-7 7Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">Farm 360</span>
        </Link>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="theme-mode">Theme mode</label>
          <select
            id="theme-mode"
            value={themeMode}
            onChange={(event) => onThemeChange(event.target.value as ThemeMode)}
            aria-label={`Theme mode: ${themeMode === 'system' ? `System (${resolvedTheme})` : themeMode}`}
            className="h-9 rounded-lg border border-stone-200 bg-white px-2 text-xs font-medium text-stone-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          >
            <option value="system">System ({resolvedTheme})</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <button
            type="button"
            onClick={onProfileClick}
            className="flex size-10 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-600 transition hover:border-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            aria-label={hasProfile ? 'Edit user profile' : 'Create user profile'}
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt="User profile" className="size-10 rounded-full object-cover" />
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.7-3.3 3-5 6.5-5s5.8 1.7 6.5 5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          {hasProfile && (
            <button type="button" onClick={onLogout} className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
