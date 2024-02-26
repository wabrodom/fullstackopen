import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { queryClient } from '../App'

export const result = useQuery({
  queryKey: ['blogs'],
  queryFn: blogService.getAll,
  onSuccess: (arrayOfObject) => {
    const copyBlogs = [...arrayOfObject]
    return copyBlogs.sort((a,b) => b.likes - a.likes)
  } 
})

export const newBlogMutation = useMutation({
  mutationFn: blogService.create,
  onSuccess: (newBlog) => {
    queryClient.invalidateQueries({ queryKey: ['blogs']})
    setMessage(
      `a new blog ${newBlog.title} by ${newBlog.author} added`,
      'success',
       5
    )
  },
  onError: (error) => {
    setMessage(error + ' redirect to login again', 'errer', 5)
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
})


export const likeBlogMutation = useMutation({
  mutationFn: blogService.likeABlog,
  onSuccess: (newblog) => {
    queryClient.invalidateQueries({ queryKey: ['blogs']})
    setMessage(
      `like is add to ${newblog.title} by ${newblog.author}`,
      'success',
      5
    )
  },
  onError: (error) => {
    setMessage(error, 'error', 5)
  }
})

export const removeBlogMutataion = useMutation({
  mutationFn: blogService.remove,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['blogs']})
  },
  onError: (error) => {
    setMessage(error, 'error login again', 5)
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
})