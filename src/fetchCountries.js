export const fetchCountries = function (country) {
  const filter = 'fields=name,capital,population,flags,languages';

  return fetch(`https://restcountries.com/v3.1/name/${country}?${filter}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    }
  );
};
