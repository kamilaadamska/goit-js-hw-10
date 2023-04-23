import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.getElementById('search-box');

searchBoxEl.addEventListener('input', () => {
  fetchCountries(searchBoxEl.value)
    .then(users => console.log(users))
    .catch(error => console.log(error));
});
