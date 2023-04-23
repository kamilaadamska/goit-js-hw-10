import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.getElementById('search-box');

searchBoxEl.addEventListener(
  'input',
  debounce(() => {
    if (!searchBoxEl.value) {
      return;
    }

    fetchCountries(searchBoxEl.value.trim())
      .then(countries => {
        if (countries.length > 10) {
          return Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        console.log(countries);
      })
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);
