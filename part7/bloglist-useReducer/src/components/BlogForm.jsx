import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box } from '@mui/material'

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
  const buttonWidth = {
    width: '100px',
  }

  return (
    <form onSubmit={addBlog}>
        <Box 
          display="flex"
          flexDirection='column'
          // alignItems="center"
          sx={{mb: 2}} 
        > 
          <TextField {...title} variant="standard"/>
          <TextField {...author} variant="standard"/>
          <TextField {...url} variant="standard"/>

          <Button 
            style={buttonWidth}
            type='submit' 
            id='create-blog' 
            variant='contained' 
            color='primary' 
            sx={{m : 1}}
          >
            create
          </Button>

        </Box>
    </form>

  )
}

export default BlogForm