const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER_TEXT' : {
      return action.payload
    }
    default: 
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'FILTER_TEXT',
    payload: filter
  }
}

export default filterReducer