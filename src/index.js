// import './sass/main.scss';
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

function onSearch(e) {
  e.preventDefault();
  API.fetchCountries(refs.inputForm.value).then(processingCountries);
}

function processingCountries(response) {
  if (response.length === 1) {
    renderCountries(response);
    alert({ text: 'Такая страна есть !' });
  } else if (response.length >= 10) {
    alert({ text: 'Слишком большой запрос' });
    return;
  } else {
    onSearchError();
  }
};

function onSearchError(error) {
  alert({
    text: 'Такой страны нет !',
  });
}
