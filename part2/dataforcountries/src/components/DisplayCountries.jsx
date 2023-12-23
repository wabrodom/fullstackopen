
import ShowOneCountryData from "./ShowOneCountryData"

const DisplayCountries = (props) => {
    const matchCountries = props.matchCountries
    const show = props.show;
    const handleClick = props.handleClick;
    const weather = props.weather;

    // first render of App component, countryWeather state is not change so it is null, anything use this props will break
    // when event occur in subcomponent, attach function run, state of parent component change -> App will rerender

    if (weather === null) {
        console.log(" weather is null")
        return null;
    } 

    if (matchCountries.length === 1) {

        return (
            <ShowOneCountryData 
                country={matchCountries[0]} 
                weather={weather}
            />
        ) 
    }

    
    return (
        <section> 
            {console.log("inside 2.DisplayCountries")}
            <p>{props.message}</p> 
            <ul>
              {matchCountries.map((country, index) => (
                <li key={country.ccn3}>
                    {country.name.common}

                    <button onClick={() => handleClick(index, country)}>
                        {show[index] ? "hide": "show"}
                    </button>

                    {show[index]
                        ? <ShowOneCountryData country={country} weather={weather}/> 
                        : null}
                </li>
              ))}
            </ul> 
        </section>
    )
}



export default DisplayCountries;