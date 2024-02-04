import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'anecdote 1',
        id: 100,
        votes: 0
      },
      {
        content: 'anecdote 2',
        id: 101,
        votes: 0
      },
    ]

    const action = {
      type: 'VOTE',
      payload: { id: 101 }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({ 
      content: 'anecdote 2',
      id: 101,
      votes: 1
    })
  })

  test('returns new state with action ADD', () => {
    const state = []
    const action = {
      type: 'ADD',
      payload: {
        content: 'anecdote 1',
        id: 100,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })

})