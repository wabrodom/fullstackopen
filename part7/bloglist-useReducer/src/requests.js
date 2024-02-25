import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

export const getBlogs = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createBlog = (object) => 
  axios.post(baseUrl, )