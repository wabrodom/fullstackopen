import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange: (state, action) => {
      const currentText = action.payload
      return currentText
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer


// const filterReducer = (state = '', action) => {
//   switch(action.type) {
//     case 'FILTER_TEXT' : {
//       return action.payload
//     }
//     default: 
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: 'FILTER_TEXT',
//     payload: filter
//   }
// }