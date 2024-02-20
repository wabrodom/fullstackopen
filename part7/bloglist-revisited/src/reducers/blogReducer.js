const blogsReducer = (state = [], action ) => {
  switch(action.type) {
    case 'CREATE_BLOG': {
        const newState = state.concat(action.payload)
        return newState
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

export default blogsReducer