import { configureStore } from '@reduxjs/toolkit'
import { getStoredProfile } from '../shared/services/authStorage'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      profile: getStoredProfile(),
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
