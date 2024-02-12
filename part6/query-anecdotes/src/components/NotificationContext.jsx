  import { createContext, useReducer } from 'react'

  const NotificationContext = createContext()

  const notificationReducer = (state, action) => {
    switch(action.type) {
      case 'create': {
        return `Created '${action.payload}'`
      }
      case 'vote': {
        return `Anecdote '${action.payload}' voted `
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

  export default NotificationContext