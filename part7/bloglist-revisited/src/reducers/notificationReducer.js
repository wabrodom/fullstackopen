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

const resetIn = (callback ,second) => {
  return setTimeout(callback, second *1000)
}

export const setMessage = (text, second) => {
  return (dispatch) => {
    const actionObject = {
      type: 'SET_MESSAGE',
      payload : text
    }
    dispatch(actionObject)
    resetIn(dispatch({ type: 'RESET' }), second)
  }
  
}

export default notificationReducer