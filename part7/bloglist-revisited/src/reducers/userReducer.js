const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER' : {
      return action.payload
    }
    case 'CLEAR_USER' : {
      return null
    }
    default: {
      return state
    }
  }
}

export const setUser = (object) => {
  return {
    type: 'SET_USER',
    payload: object
  }
}

export const clearUser= () => {
  return { type: 'CLEAR_USER' }
}

export default userReducer