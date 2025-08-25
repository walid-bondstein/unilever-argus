import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AppState {
  sidebarOpen: boolean
  notifications: Array<{
    id: string
    message: string
    type: "success" | "error" | "warning" | "info"
  }>
}

const initialState: AppState = {
  sidebarOpen: false,
  notifications: [],
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<AppState["notifications"][0], "id">>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { toggleSidebar, setSidebarOpen, addNotification, removeNotification } = appSlice.actions
export default appSlice.reducer
