
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleSearch = () => {
    const input = document.getElementById('search-input');
    setSearchTerm(input.value);
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="Search for a country"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="country-list">
        {filteredCountries.length === 0 ? (
          <p>No country found!</p>
        ) : (
          filteredCountries.map(country => (
            <div key={country.alpha3Code} className="country-card">
              <img src={country.flag} alt={`${country.name} Flag`} />
              <h2>{country.name}</h2>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;