import { useSelector } from "react-redux"

const Notification = () => {

  const [message, messageClass] = useSelector(state => state.notification)
  
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