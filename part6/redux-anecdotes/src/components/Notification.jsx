import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notificationHelper = () => (
    <div style={style}>
      {notification}
    </div>
  )
  return (
    <div>
      {notification && notificationHelper()}
    </div>
  )
}

export default Notification