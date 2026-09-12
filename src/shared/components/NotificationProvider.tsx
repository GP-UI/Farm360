import { useEffect, useState, type ReactNode } from 'react'
import { NotificationContext } from '../hooks/notificationContext'
import type { Notification } from '../hooks/notificationContext'

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null)

  function notify(nextNotification: Notification) {
    setNotification(nextNotification)
  }

  useEffect(() => {
    if (!notification) return

    const timeoutId = window.setTimeout(() => setNotification(null), 4000)
    return () => window.clearTimeout(timeoutId)
  }, [notification])

  return (
    <NotificationContext value={{ notify }}>
      {children}
      {notification && (
        <div className="fixed right-5 top-24 z-[60] w-[min(22rem,calc(100vw-2.5rem))]" role="status" aria-live="polite">
          <div className={`rounded-lg border px-4 py-3 text-sm shadow-lg ${notification.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext>
  )
}
