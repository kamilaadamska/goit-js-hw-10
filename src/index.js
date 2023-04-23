import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBoxEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBoxEl.addEventListener(
  'input',
  debounce(() => {
    if (!searchBoxEl.value) {
      return;
    }

    fetchCountries(searchBoxEl.value.trim())
      .then(countries => {
        if (countries.length > 10) {
          countryListEl.innerHTML = '';
          return Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        renderCountryList(countries);
      })
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `
          <li class="list-item">
          <img src="${country.flags.svg}" alt="A flag" width="45px" />
          <span>${country.name.official}</span>
          </li>
      `;
    })
    .join('');
  countryListEl.innerHTML = markup;

  if (countries.length === 1) {
    const languagesArr = Object.values(countries[0].languages).join(', ');

    countryInfoEl.innerHTML = `<ul>
    <li>Capital: ${countries[0].capital}<li>
    <li>Population: ${countries[0].population}<li>
    <li>Languages: ${languagesArr}<li>
    </ul>`;
  } else {
    countryInfoEl.innerHTML = '';
  }
}
