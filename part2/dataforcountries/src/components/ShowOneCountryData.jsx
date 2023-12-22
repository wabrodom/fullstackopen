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

export default ShowOneCountryData;