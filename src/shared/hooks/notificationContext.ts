import { createContext, use } from 'react'

export type Notification = {
  type: 'success' | 'error'
  message: string
}

export type NotificationContextValue = {
  notify: (notification: Notification) => void
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)

export function useNotification() {
  const context = use(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used inside NotificationProvider')
  }

  return context
}
