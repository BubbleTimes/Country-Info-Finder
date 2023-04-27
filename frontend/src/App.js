  import React, { useState } from 'react';
  import axios from 'axios';

  function App() {
    const [countryInfo, setCountryInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const countryName = e.target.elements.countryInput.value.trim();
      try {
        const response = await axios.get(`http://localhost:3001/api/country/${countryName}`);
        setCountryInfo(response.data);
        setErrorMessage('');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Invalid country name entered.');
          } else {
            setErrorMessage(`Could not fetch country information: ${error.message}`);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Country Info Finder</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <label>
            Enter a country name:
            <input type="text" name="countryInput" required style={{ marginLeft: '1rem' }} />
          </label>
          <button type="submit" style={{ marginLeft: '1rem', backgroundColor: '#008CBA', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
        </form>
        {isLoading && <p>Loading...</p>}
        {errorMessage && (<div className="errorMessage"> <p>{errorMessage}</p>  </div>) }
        {countryInfo && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <h2>{countryInfo.name.common}</h2>
            <img src={countryInfo.flags.svg} alt={`${countryInfo.name.common} flag`} width="200" style={{ marginBottom: '1rem' }} />
            <p><strong>Capital:</strong> {countryInfo.capital}</p>
            <p><strong>Population:</strong> {countryInfo.population}</p>
            <p><strong>Region:</strong> {countryInfo.region}</p>
            <p><strong>Subregion:</strong> {countryInfo.subregion}</p>
            <p><strong>Languages:</strong> {countryInfo.languages.join(', ')}</p>
          </div>
        )}
      </div>
    );
  }

  export default App;
