import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"
import { Alert } from '@mui/material'

const Notification = () => {
  const [notiArray, dispatch] = useContext(NotificationContext)

  const [message, messageClass] = notiArray

  if (message === null ) {
    return null
  }
  return (
    <Alert className={`message ${messageClass}`}>
        <p>{message}</p>
    </Alert>
  )
}

export default Notification