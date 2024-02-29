const Comments = ({ comments }) => {
  if (!comments) 
    return null


  return (
    <ul>
      {comments.map(obj => (
        <li key={obj.id}>
          {obj?.comment}
        </li>
      ))}
    </ul>
  )
}

export default Comments