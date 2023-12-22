import {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayCountries from './components/DisplayCountries';

const App = () => {
    const [countries, setCountries] = useState(null);
    const [value, setValue] = useState('')
    const [matchCountries, setMatchCountries] = useState([]);
    const [tooMuchMatched, setTooMuchMatched] = useState(null);


    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)
            })
        
    },[])

    if (!countries) {
        return null;
    }

    const handleChange =(event) => { 
        const currentValue = event.target.value;
        setValue(currentValue)
        if (currentValue !== '') {
            grabTenCountries(currentValue)
        } else {
            setMatchCountries([])
        }
    }

    const grabTenCountries = (input) => {
        const filteredCountries = countries.filter(obj => {
            const nameLowerCase = obj.name.common.toLowerCase()
            return nameLowerCase.includes(input.toLowerCase())
        } ) || [];
// pay attention to this

        if (filteredCountries.length > 10) {
            setTooMuchMatched("Too many matches, specify another filter")
            setMatchCountries([])
            return;
        } else {
            setTooMuchMatched(null)
            setMatchCountries(filteredCountries);
        }
    } 



    return (
        <div>
            <p>find countries 
                <input 
                    onChange={handleChange } 
                    value={value}
                />
            </p>
            <DisplayCountries 
                message={tooMuchMatched} 
                matchCountries={matchCountries}
            />
        </div>
    )
}


export default App;