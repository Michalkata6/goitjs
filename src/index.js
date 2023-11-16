import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById("search-box");
const countryList = document.getElementById("country-list");
const countryDetails = document.getElementById("country-details");
const buttonElement = document.querySelector('.btn-load');


    const API_URL = `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,capital,population,flags,languages`; 

    let lastSearchTerm = "";

   
    function filterFields(countryData) {
      return {
        name: countryData.name.official,
        capital: countryData.capital,
        population: countryData.population,
        flags: {
          svg: countryData.flags.svg,
        },
        languages: countryData.languages,
      };
    }

  
    const debounceSearch = debounce((searchTerm) => {
      if (searchTerm.trim() === "") {
        countryList.innerHTML = "";
        countryDetails.innerHTML = "";
        return;
      }

      fetchCountries(`${API_URL}?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          countryList.innerHTML = "";
          countryDetails.innerHTML = "";

          if (data.length === 0) {
            Notiflix.Notify.failure("No matching countries found.");
          } else if (data.length > 10) {
            Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
          } else if (data.length >= 2 && data.length <= 10) {
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
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 300);

    function showCountryDetails(country) {
      countryDetails.innerHTML = `
        <div class="country-card">
          <img src="${country.flags.svg}" alt="${country.name.official}">
          <h2>${country.name.official}</h2>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        </div>
      `;
    }

    searchBox.addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim();
      if (searchTerm !== lastSearchTerm) {
        lastSearchTerm = searchTerm;
        debounce(searchTerm);
      }
    });