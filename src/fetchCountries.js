import Notiflix from 'notiflix';

const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryListRef.innerHTML = '';
      countryInfoRef.innerHTML = '';
      //   throw new Error(response.status);
    }
    return response.json();
  });
}
