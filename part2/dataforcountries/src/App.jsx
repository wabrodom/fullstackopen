import {useState, useEffect} from 'react'
import axios from 'axios'

import DisplayCountries from './components/DisplayCountries';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
    const [countries, setCountries] = useState(null);
    const [value, setValue] = useState('')
    const [matchCountries, setMatchCountries] = useState([]);
    const [tooMuchMatched, setTooMuchMatched] = useState(null);
    const [show, setShow] = useState(Array(matchCountries.length).fill(false))
    const [countryWeather, setCountryWeather] = useState(null);

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
            setShow([])
        }
    }

    const getWeather = (city) => {
        const firstPartUrl = 'https://api.openweathermap.org/data/2.5/weather';
   
        axios.get(`${firstPartUrl}?q=${city}&appid=${WEATHER_API_KEY}`)
            .then(response => {
                setCountryWeather(response.data)
            })

    }
    
    const grabTenCountries = (input) => {
        const filteredCountries = (countries ?? []).filter(obj => {
            const nameLowerCase = obj.name.common.toLowerCase()
            return nameLowerCase.includes(input.toLowerCase())
        } ) ;
        // in case of server not resolve so cant get response.data === typeof array ? safe null
        
        if (filteredCountries.length === 1) {
            setTooMuchMatched(null)
            setMatchCountries(filteredCountries);
            setShow(new Array(filteredCountries.length).fill(false))

            const capitalCity = filteredCountries[0].capital[0];
            getWeather(capitalCity)
        }
        if (filteredCountries.length > 10) {
            setTooMuchMatched("Too many matches, specify another filter")
            setMatchCountries([])
            setShow([])
            return;
        } else {
            setTooMuchMatched(null)
            setMatchCountries(filteredCountries);
            setShow(new Array(filteredCountries.length).fill(false))
        }
    } 

 


    const toggleShow = (index, countryObject) => {
        console.log("Toggle show")
        const copyShow = [...show]
        const capitalName = countryObject.capital[0]
        copyShow[index] = !copyShow[index]
        setShow(copyShow)

        getWeather(capitalName)
    }

  

    return (
        <div>
            {console.log("inside 1.App")}
            <p>find countries 
                <input 
                    onChange={handleChange } 
                    value={value}
                />
            </p>
            <DisplayCountries 
                message={tooMuchMatched} 
                matchCountries={matchCountries}
                show={show}
                handleClick={toggleShow}
                weather={countryWeather}
            />
        </div>
    )
}


export default App;