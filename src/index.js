import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const countryList = document.getElementById("country-list")
const countryInfo = document.getElementById("country-info")
const searchBox = document.getElementById('search-box')

  function handleSearch() {
    const input = searchBox.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  
    if (input !== '') {
      fetchCountries(input)
        .then(data => {
        console.log(data)

        if (data.length === 0) {
          Notiflix.Notify.failure("No matching countries found.");
        } else if (data.length > 10) {
          Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
        } else if (data.length >= 2 && data.length <= 10) 
        {
          data.forEach((country) => {
            const countryItem = document.createElement("div");
            countryItem.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}"><p>${country.name.official}</p>`;
            countryItem.addEventListener("click", () => showCountryDetails(country));
            countryList.appendChild(countryItem);
          });
          } else if (data.length === 1) {
          showCountryDetails(data[0]);
      }
        })
        .catch(error => {
          
          console.error(error);
        });
    } 
    }
  
  searchBox.addEventListener('input', debounce(handleSearch, 300));

          
  function showCountryDetails(country) {
    countryInfo.innerHTML = `
      <div class="country-card">
        <img src="${country.flags.svg}" alt="${country.name.official}">
        <h2>${country.name.official}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
      </div>
    `;
  }
