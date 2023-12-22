import { useState } from "react"

const DisplayCountries = (props) => {
    const matchCountries = props.matchCountries
    
    const [show, setShow] = useState(Array(matchCountries.length).fill(false))
    // console.log(show)

    const useData = matchCountries.map(obj => { 
        return ( [obj.name.common, obj.ccn3] )
    })
  


    if (matchCountries.length === 1) {
        return (
            <ShowOneCountryData country={matchCountries[0]}/>
        ) 
    }

    const oneCountryData = (name) => {
        const country = matchCountries.find(obj => obj.name.common === name)
        return country
    }   

    const toggleShow = (index) => {
        const useDataShow = [...show]
        useDataShow[index] = !useDataShow[index]
        setShow(useDataShow)
    }
    
    return (
        <section> 
            <p>{props.message}</p> 
            <ul>
              {useData.map((country, index) => (
                <li key={country[1]}>
                    {country[0]}
                    <button onClick={() => toggleShow(index)}>
                        {show[index] ? "hide": "show"}
                    </button>
                    {show[index]
                        ? <ShowOneCountryData country={oneCountryData(country[0])}/> 
                        : null}
                </li>
              ))}
            </ul> 
        </section>
    )
}

const ShowOneCountryData = (props) => {
    const country = props.country;

    const name = country.name.common;
    const capital = country.capital;
    const area = country.area;
    const flag = country.flags.png;
    const languages = Object.entries(country.languages);

    return (
        <div>
            <h1>{name}</h1>
            <p>
                The capital city is {capital}. 
            </p>
            <p>
                Area: {area} km²
            </p>

            <img src={flag} alt={"flag of ${name}"} />
            <ul>
                Langauge: {languages.map(lan => 
                    <li key={lan[0]}>
                        {lan[1]}
                    </li>)
                    
                }
            </ul>    
        </div>
    )
}

export default DisplayCountries;