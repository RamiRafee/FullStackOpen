const CountryList = ({ countries, onSelect }) => {
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => onSelect(country)} style={{ marginLeft: 10 }}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }
  
  export default CountryList