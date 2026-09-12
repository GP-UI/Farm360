import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ThemeContext, type ResolvedTheme, type ThemeMode } from './themeContext'

const THEME_STORAGE_KEY = 'shreeja_farm_theme'

function getInitialMode(): ThemeMode {
  try {
    const storedMode = localStorage.getItem(THEME_STORAGE_KEY)
    return storedMode === 'light' || storedMode === 'dark' || storedMode === 'system'
      ? storedMode
      : 'system'
  } catch {
    return 'system'
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribeToSystemTheme(onChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getServerTheme(): ResolvedTheme {
  return 'light'
}

function persistTheme(mode: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
    return true
  } catch {
    return false
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme)
  const resolvedTheme = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    persistTheme(mode)
    document.documentElement.dataset.theme = resolvedTheme
  }, [mode, resolvedTheme])

  return <ThemeContext value={{ mode, resolvedTheme, setMode }}>{children}</ThemeContext>
}