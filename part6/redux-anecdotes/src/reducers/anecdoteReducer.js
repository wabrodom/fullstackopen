import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      const object = action.payload
      return [...state, object]
    },
    voteTo(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      newState.sort((a,b) => b.votes - a.votes)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, voteTo, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (object) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createOneAnecdote(object)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (object) => {
  return async (dispatch) => {
    const newObject = {...object, votes: object.votes + 1}
    const returnedObject = await anecdotesService.updateOneAnecdote(newObject)
    dispatch(voteTo(returnedObject))
  }
}
export default anecdoteSlice.reducer


// export const createAnecdote = (content) => {
//   return {
//     type: 'ADD',
//     payload: asObject(content)
//   }
// }

// export const voteTo = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// const reducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch(action.type) {
//     case 'VOTE' : {
//       const id = action.payload.id
//       const anecdoteToChange  = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
//       const newState = state.map(anecdote => anecdote.id !== id ? anecdote: changedAnecdote)
//       newState.sort((a,b) => b.votes - a.votes)
//       return newState
//     }
//     case 'ADD' : {
//       return state.concat(action.payload)
//     }
//   } 

//   return state
// }