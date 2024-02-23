import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    initializeBlog : (state, action) => {
      const arrayOfObject = action.payload
      return arrayOfObject
    },
    createBlog: (state, action) => {
      const newState = state.concat(action.payload)
      return newState
    }
  }
})

export const { initializeBlog, createBlog } = blogSlice.actions

export const setBlogs = (object) => {
  return (dispatch) => {
    dispatch(initializeBlog(object))
  }
}

export const addBlog = (object) => {
  return (dispatch) => {
    dispatch(createBlog(object))
  }
}


export default blogSlice.reducer