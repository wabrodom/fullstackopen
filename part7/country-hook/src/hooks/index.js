import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`${baseUrl}`).then(response => {
      setCountry(response.data)
      console.log('useEffect after app rerender 1')
    })
  }, [])

  if (country === null) return null

  const foundCountry = country.find(obj => {
    const objName = obj.name.common.toLowerCase()
    const inputName = name.toLowerCase()
    return objName === inputName
  })
  

  if (!foundCountry)  {
    return { found : false }
  }
  const returnCountry = {
    found: true,
    data: {
      name: foundCountry.name.common,
      capital: foundCountry.capital[0],
      population: foundCountry.population,
      flag: foundCountry.flags.png,
    }
  }

  return returnCountry
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}