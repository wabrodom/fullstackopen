import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = { marginBottom :'1.5rem' }

  return (
    <div style={style}>
      <span>filter </span>
      <input 
        onChange={handleChange}
        value={filter}
      />
    </div>
  )
}

export default Filter