const ShowOneCountryData = (props) => {
    const country = props.country;
    const weather = props.weather;

    const name = country.name.common;
    const capital = country.capital;
    const area = country.area;
    const flag = country.flags.png;
    const languages = Object.entries(country.languages);

    const weatherDescribe = weather.weather[0].description;
    const weatherIcon =  weather.weather[0].icon;
    const preUrlIcon = 'https://openweathermap.org/img/wn/';
    const postUrlIcon = '@2x.png';
    const kelvin = weather.main.temp;
    const celcius = (kelvin - 273).toFixed(2);

    return (
        <div>
            {console.log('Inside 3.ShowOneCountryData')}
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

            <div>
                <h3>
                    Weather in {weather.name}
                </h3>
                <h4>`{weatherDescribe}`</h4> 
                <p>Temperature: {celcius} Celsius.</p> 
                    <img src={`${preUrlIcon}${weatherIcon}${postUrlIcon}`} alt="" />
                <p>wind {weather.wind.speed} m/s</p>
            </div>

        </div>
    )
}

export default ShowOneCountryData;