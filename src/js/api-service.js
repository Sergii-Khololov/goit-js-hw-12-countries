const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(countrName) {
  return fetch(`${BASE_URL}/name/${countrName}`).then(response => response.json());
}

export default { fetchCountries };
