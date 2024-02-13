import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = (props) => {

    const content = useField('content', 'text')
    const author = useField('author', 'text')
    const info = useField('info', 'url')


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
          <button>create</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew