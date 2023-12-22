
import ShowOneCountryData from "./ShowOneCountryData";

const DisplayCountries = (props) => {
    const matchCountries = props.matchCountries
    const handleClick  = props.handleClick;
    const show = props.show;

    const useData = matchCountries.map(obj => { 
        return ( [obj.name.common, obj.ccn3] )
    })
  

    const oneCountryData = (name) => {
        const country = matchCountries.find(obj => obj.name.common === name)
        return country
    }   
    
    if (matchCountries.length === 1) {
        return (
            <ShowOneCountryData country={matchCountries[0]}/>
        ) 
    }

    
    return (
        <section> 
            <p>{props.message}</p> 
            <ul>
              {useData.map((country, index) => (
                <li key={country[1]}>
                    {country[0]}

                    <button onClick={() => handleClick(index)}>
                        {show[index] ? "hide": "show"}
                    </button>

                    {show[index]
                        ? <ShowOneCountryData country={oneCountryData(country[0])}/> 
                        : null
                    }   
                </li>
              ))}
            </ul> 
        </section>
    )
}



export default DisplayCountries;