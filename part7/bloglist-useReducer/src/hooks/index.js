import { useState } from "react"

export const useField = (name, type) => {
  const [value, setValue] = useState('')
  const id = name

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')


  return { name, type, id, value, onChange, reset}
}