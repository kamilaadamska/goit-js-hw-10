const API_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(`${API_URL}/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
