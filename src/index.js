import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  let countryName = event.target.value.trim();

  if (countryName.length < 1) {
    clearInreface();
    return;
  }

  fetchCountries(countryName)
    .then(resault => {
      console.log(resault);
      if (resault.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        ),
          {
            timeout: 5000,
          };
        clearInreface();
        return;
      }
      if (resault.length > 1) {
        createCountryList(resault);
      }
      if (resault.length === 1) {
        createCountryInfo(resault);
      }
    })
    .catch(error => {
      clearInreface();
      Notify.failure('Oops, there is no country with that name'),
        {
          timeout: 4000,
        };
    });
}

function createCountryList(resault) {
  div.innerHTML = '';
  const markupLi = resault
    .map(
      res => `
      <li class='country-list__item country-title-box'>
        <img class='country-list__svg' src='${res.flags.svg}' width='30'/>
        <p class='country-list__name'>${res.name.official}</p>
      </li>
      `
    )
    .join('');
  ul.innerHTML = markupLi;
}

function createCountryInfo(resault) {
  ul.innerHTML = '';
  let capital = resault[0].capital.join(', ');
  let languages = Object.values(resault[0].languages).join(', ');
  let res = resault[0];
  const markupInfo = `
    <div class='country-info__title country-title-box'>
        <img class='country-info__svg' src='${res.flags.svg}' width='50' />
        <p class='country-list__name'>${res.name.official}</p>
      </div>
      <ul>
        <li>
          <p>Capital: <span class='span'>${capital}</span></p>
        </li>
        <li>
          <p>Population: <span class='span'>${res.population}</span></p>
        </li>
        <li>
          <p>Languages: <span class='span'>${languages}</span></p>
        </li>
      </ul>
      `;
  div.innerHTML = markupInfo;
}

function clearInreface() {
  div.innerHTML = '';
  ul.innerHTML = '';
}
