import {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayCountries from './components/DisplayCountries';

const App = () => {
    const [countries, setCountries] = useState(null);
    const [value, setValue] = useState('')
    const [matchCountries, setMatchCountries] = useState([]);
    const [tooMuchMatched, setTooMuchMatched] = useState(null);
    const [show, setShow] = useState(Array(matchCountries.length).fill(false))

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                console.log('promise fulfiled')
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
            setShow([])
        }
    }

    const grabTenCountries = (input) => {
        const filteredCountries = countries.filter(obj => {
            const nameLowerCase = obj.name.common.toLowerCase()
            return nameLowerCase.includes(input.toLowerCase())
        } ) || [];
            // pay attention to this, in some case if fetch really fail countrie could be null

        if (filteredCountries.length > 10) {
            setTooMuchMatched("Too many matches, specify another filter")
            setMatchCountries([])
            setShow([])
            return;
        } else {
            setTooMuchMatched(null)
            setMatchCountries(filteredCountries);
            setShow(Array(filteredCountries.length).fill(false))
        }
    } 

    const toggleShow = (index) => {
        const copyShowArr = [...show]
        copyShowArr[index] = !copyShowArr[index]
        setShow(copyShowArr)
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
                handleClick={toggleShow}
                show={show}
            />
        </div>
    )
}


export default App;