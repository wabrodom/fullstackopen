import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI' :{
      return action.payload
    }
    case 'CLEAR_NOTI' : {
      return [null, null]
    }
    default : {
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notiArray, notiDispatch] = useReducer(notificationReducer, [null, null])

  return (
    <NotificationContext.Provider value={[notiArray, notiDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNoti = ()=> {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[0]
}

export const useNotiDispatch = ()=> {
  const dispatch = useContext(NotificationContext)[1]
  return (text, namedClass , second) => {
    dispatch({ 
      type: 'SET_NOTI', 
      payload : [text, namedClass] 
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTI'
      })
    }, second * 1000 )
  }
}

export default NotificationContext