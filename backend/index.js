const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/country/:name', async (req, res) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${req.params.name}`);
    const countryData = response.data[0];
    const countryInfo = {
      name: countryData.name,
      capital: countryData.capital,
      population: countryData.population,
      region: countryData.region,
      subregion: countryData.subregion,
      languages: Object.values(countryData.languages),
      flags: countryData.flags,
    };  
    res.json(countryInfo);
  } catch (error) {
    res.status(400).send(`Could not fetch country information: ${error.message}`);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
