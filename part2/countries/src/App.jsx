
import './App.css'
import { useState } from 'react'
import CountryList from './CountryList'
import CountryDetail from './CountryDetail'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)

  const handleSearch = (e) => {
    const query = e.target.value
    setSearch(query)
    setSelected(null)

    if (query.trim() === '') {
      setCountries([])
      return
    }

    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(c =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setCountries(filtered)
        if (filtered.length === 1) setSelected(filtered[0])
      })
  }

  const renderResults = () => {
    if (selected) return <CountryDetail country={selected} />
    if (countries.length > 10) return <p>Too many matches, specify another filter</p>
    if (countries.length > 1) {
      return (
        <CountryList
          countries={countries}
          onSelect={setSelected}
        />
      )
    }
    return null
  }

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleSearch} />
      </div>
      {renderResults()}
    </div>
  )
}

export default App
