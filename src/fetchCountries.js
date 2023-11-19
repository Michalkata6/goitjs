async function fetchCountries(name) {
  try {
    const searchTerm = encodeURIComponent(name);
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fields=name,capital,population,flags,languages`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { fetchCountries };
