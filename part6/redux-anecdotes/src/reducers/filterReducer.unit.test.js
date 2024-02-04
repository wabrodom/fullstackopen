import filterReduce from "./filterReducer"
import deepFreeze from "deep-freeze"

describe('filterReducer', () => {
  test('returns new state of with action FILTER_TEXT' ,() => {
    const state = ''
    const action = {
      type: 'FILTER_TEXT',
      payload: 'often'
    }

    const newState = filterReduce(state, action)
    expect(newState).toEqual('often')
  })
})
