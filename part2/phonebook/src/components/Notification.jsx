const Notification = (props) => {
    const message = props.message;
    if (message === null) return;
    return (
      <div className="alert">
        {message}
      </div>
    )
  }


export default Notification;