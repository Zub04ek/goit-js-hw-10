import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
  if (evt.target.value === '' || evt.target.value.trim() === '') {
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
    return;
  }
  fetchCountries(evt.target.value)
    .then(countries => {
      if (countries.length > 10) {
        countryListRef.innerHTML = '';
        countryInfoRef.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      }
      if (countries.length === 1) {
        renderCountryCard(countries);
      }
    })
    .catch(error => console.log(error));
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `
          <li>
          <img src="${country.flags.svg}" alt="flag" width="40" height="30">
            ${country.name.official}
          </li>
      `;
    })
    .join('');
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = markup;
}

function renderCountryCard(countries) {
  const markup = countries
    .map(country => {
      const langArray = Object.values(country.languages);
      const lang = langArray.join(', ');
      return `
          <div class="country-card">
          <img src="${country.flags.svg}" alt="flag" width="40" height="30">
           <p class="country-name">${country.name.official}</p>
          </div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${lang}</p>
      `;
    })
    .join('');
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = markup;
}
