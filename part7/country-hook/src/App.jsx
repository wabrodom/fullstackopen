import React, { useState, useEffect } from 'react'
import { useCountry } from './hooks/index'
import Form from './components/Form'
import Country from './components/Country'


const App = () => {
  console.log('App is rerender')

  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e, currentName) => {
    e.preventDefault()
    setName(currentName)
  }

  return (
    <div>
      <Form fetch={fetch} />

      <Country country={country} />
    </div>
  )
}

export default App