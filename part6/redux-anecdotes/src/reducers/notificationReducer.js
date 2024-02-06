import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      const currentNotification = action.payload
      return currentNotification
    }, 
    removeNotification: () => {
      return null
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer