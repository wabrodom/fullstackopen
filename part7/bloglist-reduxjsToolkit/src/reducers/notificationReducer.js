import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState : [null, null],
  reducers: {
    setNotification(state, action) {
      const [message, namedClass] = action.payload
      const newState = [message, namedClass]
      return newState
    },
    clearNotification(state, action) {
      return [null, null]
    },
  }
})

export const { clearNotification } = notificationSlice.actions

export const setMessage = (text, namedClass, second) => {
  return async (dispatch) => {
     dispatch({
      type: 'notification/setNotification',
      payload: [text, namedClass]
     })
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}


export default notificationSlice.reducer