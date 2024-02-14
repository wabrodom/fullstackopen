import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/index'
import { useRef } from "react"

const CreateNew = (props) => {

    const content = useField('content', 'text')
    const author = useField('author', 'text')
    const info = useField('info', 'url')
    const contentRef = useRef(null)
    const authorRef = useRef(null)
    const infoRef = useRef(null)

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
      contentRef.current.value = ''
      authorRef.current.value = ''
      infoRef.current.value = ''
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <label>
            content 
            <input ref={contentRef} {...content} />
          </label>
          <label>
            author 
            <input ref={authorRef} {...author} />
          </label>
          <label>
            url for more info 
            <input ref={infoRef} {...info} />
          </label>
          <button type='submit'>create</button>
          <button type='button' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew