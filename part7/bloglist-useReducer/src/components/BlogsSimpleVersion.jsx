import { Link } from "react-router-dom";
import NewBlogTogglable from "./NewBlogTogglable"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const BlogsSimpleVersion = ({ blogs, handleAddBlog, passedRef}) => {

  // const blogStyle = {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  return (
    <div>
      <NewBlogTogglable
        buttonLabel='new blog'
        handleAddBlog={handleAddBlog}
        passedRef={passedRef}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id} >
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>

                <TableCell>
                <span> likes: {blog.likes}</span>
                </TableCell>
              </TableRow> 
            )}  
          </TableBody>

        </Table>

      </TableContainer>
   
    </div>
  )
}

export default BlogsSimpleVersion