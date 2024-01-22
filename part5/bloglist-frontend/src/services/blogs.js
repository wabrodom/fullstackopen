import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
 
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getABlog = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch(exception) {
    throw exception
  }
}

const create = async (object) => {
  const config = {
    headers: { Authorization: token } 
  }
  try {
    const response = await axios.post(baseUrl, object, config)
    return response.data
  } catch(exception) {
    throw exception
  }
}

const update = async (id, object) => {
  const config ={
    headers: { Authorization: token}
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, object, config)
    return response.data
  } catch (exception) {
    throw exception
  }
}


export default {
  getAll,
  getABlog,
  create,
  update,
  setToken,
}