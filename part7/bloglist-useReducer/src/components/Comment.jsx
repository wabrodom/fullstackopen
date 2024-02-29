const Comments = ({ comments }) => {
  if (!comments) 
    return null


  return (
    <ul>
      {comments.map(obj => (
        <li>
          {obj?.comment}
        </li>
      ))}
    </ul>
  )
}

export default Comments