import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-stone-900">
          <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-stone-950">Something went wrong</h1>
            <p className="mt-2 text-sm text-stone-500">Please reload the application and try again.</p>
            <button type="button" onClick={this.handleReload} className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
              Reload application
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
