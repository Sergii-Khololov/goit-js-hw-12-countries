export default function getRefs() {
  return {
    countrContainer: document.querySelector('.js-countries'),
    searchForm: document.querySelector('.js-search-form'),
    inputForm: document.querySelector('.js-input'),
    countriesListRef: document.querySelector('.countries-list'),
  };
}
