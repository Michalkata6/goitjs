export async function fetchCountries(name) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`);
      
      if (!response.ok) {
        throw new Error('Country not found');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Oops, there is no country with that name');
    }
  }
  