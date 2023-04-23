import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.getElementById('search-box');

searchBoxEl.addEventListener(
  'input',
  debounce(() => {
    if (!searchBoxEl.value) {
      return;
    }

    fetchCountries(searchBoxEl.value.trim())
      .then(users => console.log(users))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);
