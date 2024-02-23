import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    restateBlogs : (state, action) => {
      const arrayOfObject = action.payload
      return arrayOfObject
    },
    createBlog: (state, action) => {
      const newState = state.concat(action.payload)
      return newState
    }
  }
})

export const { restateBlogs, createBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const returnedBlogs = await blogService.getAll()
    dispatch(restateBlogs(returnedBlogs))
  }
}


export const addBlog = (object) => {
  return (dispatch) => {
    dispatch(createBlog(object))
  }
}

// export const addBlog = (object) => {
//   return async dispatch => {
//     const newBlog = await blogService.create(object)
//     dispatch(createBlog(newBlog))
//   }
// }

export const setBlogs = (arrayOfObject) => {
  return (dispatch) => {
    dispatch(restateBlogs(arrayOfObject))
  }
}


export default blogSlice.reducer