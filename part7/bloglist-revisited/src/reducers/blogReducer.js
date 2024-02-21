const blogsReducer = (state = [], action ) => {
  switch(action.type) {
    case 'CREATE_BLOG': {
        const newState = state.concat(action.payload)
        return newState
    }
    case 'SET_BLOGS': {
      return action.payload
    }
    default: {
      return state
    }
  }
} 

export const createBlog = (object) => {
  return {
    type: 'CREATE_BLOG',
    payload: object
  }
}

export const setBlogs = (arrayOfObject) => {
  return {
    type: 'SET_BLOGS',
    payload: arrayOfObject
  }
}

export default blogsReducer