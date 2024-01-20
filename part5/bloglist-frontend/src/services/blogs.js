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

const create = async (object) => {
  const config = {
    headers: { Authorization: token } 
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

export default {
  getAll,
  create,
  setToken
}