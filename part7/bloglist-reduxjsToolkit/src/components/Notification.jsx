import { useSelector } from "react-redux"

const Notification = ({ messageClass }) => {

  const message = useSelector(state =>  {
    console.log(state)
    return state.notification
  } )

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