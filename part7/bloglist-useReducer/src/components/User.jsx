import { useParams, Link } from "react-router-dom"
import NewBlogTogglable from "./NewBlogTogglable"
import { 
  Container, 
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material"




const User = ( { blogs, passedRef, handleAddBlog }) => {
  const userId = useParams().id
  const currentUserBlogs = blogs.filter(obj => obj.user.id === userId)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div>
    
      <NewBlogTogglable
        buttonLabel='new blog'
        handleAddBlog={handleAddBlog}
        passedRef={passedRef}
      />
      <Container component={Paper}>
      
        <h3>Added Blogs</h3>
        <TableContainer>
          <Table>
            <TableBody>
              {currentUserBlogs.map((obj, index) => (
                <TableRow key={obj.id}>
                  <TableCell>{index + 1 }</TableCell>
                  <TableCell>
                    <Link  to={`/blogs/${obj.id}`}>
                      {obj.title}
                    </Link>
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>
      </Container>
    </div>
  )

}

export default User