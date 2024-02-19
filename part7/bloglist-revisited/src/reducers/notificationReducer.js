const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_MESSAGE' : {
      return action.payload
    } 
    case 'RESET': {
      return null
    }
    default : {
      return state
    }
  }
}

export const setMessage = (text) => {
  return {
    type: 'SET_MESSAGE',
    payload: text
  }
}

export const clearNotification = () => {
  return { type: 'RESET'}
} 


export default notificationReducer