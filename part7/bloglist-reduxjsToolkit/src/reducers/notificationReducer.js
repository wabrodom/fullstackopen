import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState : null,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return message
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setMessage = (text, second) => {
  return (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}


export default notificationSlice.reducer