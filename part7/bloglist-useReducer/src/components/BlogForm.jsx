import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ handleAddBlog }) => {

  const {reset: resetTitle, ...title} = useField('title', 'text')
  const {reset: resetAuthor, ...author} = useField('author', 'text')
  const {reset: resetsUrl, ...url} = useField('url', 'url')
  const handleReset = () => {
    resetTitle()
    resetAuthor()
    resetsUrl()
  }
  const navigate = useNavigate()
 
  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    handleReset()
    navigate('/blogs')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='title'>title: </label>
        <input {...title}/>
      </div>

      <div>
        <label htmlFor='author'>author: </label>
        <input {...author} />
      </div>

      <div>
        <label htmlFor='url'>url: </label>
        <input {...url} />
      </div>


      <button type='submit' id='create-blog'>create</button>

    </form>

  )
}

export default BlogForm