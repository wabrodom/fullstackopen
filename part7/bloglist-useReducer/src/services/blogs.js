import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/?sort=desc&field=likes`)
  return request.then(response => response.data)
}

const getABlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (object) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const update = async (id, object) => {
  const config ={
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, object, config)
  return response.data
}

const likeABlog = async (id) => {
  const foundBlog = await getABlog(id)
  foundBlog.likes = foundBlog.likes + 1
  const returnedBlog = await update(id, foundBlog)
  return returnedBlog
}

const remove = async (id) => {
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default {
  getAll,
  getABlog,
  create,
  update,
  likeABlog,
  remove,
  setToken,
}