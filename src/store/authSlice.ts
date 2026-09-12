import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile } from '../features/profile/types'

export type AuthState = {
  profile: UserProfile | null
}

const initialState: AuthState = {
  profile: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
    },
    clearProfile(state) {
      state.profile = null
    },
  },
})

export const { clearProfile, setProfile } = authSlice.actions
export default authSlice.reducer
