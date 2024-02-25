import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"

const Notification = () => {
  const [notiArray, dispatch] = useContext(NotificationContext)

  const [message, messageClass] = notiArray

  if (message === null ) {
    return null
  }
  return (
    <div className={`message ${messageClass}`}>
      <p>{message}</p>
    </div>
  )
}

export default Notification