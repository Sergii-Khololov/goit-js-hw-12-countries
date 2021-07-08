import listOfcountr from '../src/templates/countries-list.hbs';
import countriesTpl from '../src/templates/template-countries.hbs';
import API from '../src/js/api-service';
import getRefs from '../src/js/get-refs';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.inputForm.addEventListener('input', debounce(onSearch, 500));

function renderCountries(countries) {
  const markup = countriesTpl(countries);
  refs.countrContainer.innerHTML = markup;
}

function renderCountr(countr) {
  refs.countriesListRef.insertAdjacentHTML('beforeend', listOfcountr(countr));
}

function onSearch(e) {
  e.preventDefault();

  refs.countriesListRef.innerHTML = '';
  refs.countrContainer.innerHTML = '';

  const input = refs.inputForm.value;
  API.fetchCountries(input).then(processingCountries);
}

function processingCountries(response) {
  if (response.length === 1) {
    renderCountries(response);
  } else if (response.length >= 10) {
    alert({ text: 'Слишком большой запрос' });
    return;
  } else if (response.status === 404) {
    onSearchError();
  } else {
    renderCountr(response);
  }
}

function onSearchError(error) {
  alert({
    text: 'Такой страны нет !',
  });
}
