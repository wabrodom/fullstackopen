import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = (props) => {

    const { reset: contentReset ,...content } = useField('content', 'text')
    const { reset: authorReset, ...author} = useField('author', 'text')
    const { reset: infoReset, ...info} = useField('info', 'url')

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }

    const handleReset = () => {
      contentReset()
      authorReset()
      infoReset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <label>
            content 
            <input {...content} />
          </label>
          <label>
            author 
            <input {...author} />
          </label>
          <label>
            url for more info 
            <input {...info} />
          </label>
          <button type='submit'>create</button>
          <button type='button' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew