const Notification = ({message, messageClass}) => {
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