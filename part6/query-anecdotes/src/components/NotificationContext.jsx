import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET': {
      return `${action.payload}`
    }
    case 'RESET' : {
      return null
    }
    default: {
      return state
    }
  }
}

export const NotoficationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  
  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )

}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  const dispatch = notificationAndDispatch[1]
  return (payload) => {
    dispatch({type: 'SET', payload: payload })
    setTimeout(() => {
      dispatch({ type: 'RESET'})
    } , 5000)
  }
}

export default NotificationContext