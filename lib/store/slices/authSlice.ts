import { User } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean,
  token: string | null,
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.loading = false
      state.token = action.payload.token || null
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.token = null
    },
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { loginUser, logoutUser, setLoadingUser } = authSlice.actions
export default authSlice.reducer
