import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './shared/components/ErrorBoundary'
import { NotificationProvider } from './shared/components/NotificationProvider'
import { AuthProvider } from './context/AuthProvider'
import { ThemeProvider } from './context/ThemeProvider'
import AppShell from './app/AppShell'

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <AppShell />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
