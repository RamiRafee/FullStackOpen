import { useState, useEffect } from 'react'

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!latlng || latlng.length < 2) return
    const [lat, lon] = latlng
    // console.log(lat,lon)
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`
    )
      .then(res => res.json())
      .then(data => setWeather(data))
  }, [latlng])

  if (!weather || !weather.current) return null

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.current.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
        alt={weather.current.weather[0].description}
      />
      <p>wind {weather.current.wind_speed} m/s</p>
    </div>
  )
}

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0]

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width={150}
      />
      <Weather capital={capital} latlng={country.latlng} />
    </div>
  )
}

export default CountryDetail