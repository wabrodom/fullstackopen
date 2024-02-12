import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'create': {
      return `Created '${action.payload}'`
    }
    case 'vote': {
      return `Anecdote '${action.payload}' voted `
    }
    case 'error': {
      return `${action.payload}`
    }
    default: {
      return null
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
  return notificationAndDispatch[1]
}

export default NotificationContext