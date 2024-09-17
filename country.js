const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLavelDomin = document.querySelector('.top-lavel-domin')
const currencies = document.querySelector('.currencies')
const language = document.querySelector('.Language')
const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        // console.log(country)
        flagImage.src = country.flags.svg;
        countryNameH1.textContent = country.name.common;
        population.textContent = country.population;
        region.textContent = country.region;
        topLavelDomin.textContent = country.tld.join(',');
        language.innertext = country.languages;

        if (country.subRegion) {
            subRegion.textContent = country.subregion;
        }
        if (country.capital) {
            capital.textContent = country.capital;
        }
        if (country.name.nativeName) {
            nativeName.textContent = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.textContent = country.name.common;
        }
        if (country.currencies) {
            currencies.textContent = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        }
        if (country.languages) {
            language.textContent = Object.values(country.languages).join(', ')
        }
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`
                        // console.log(borderCountryTag);
                        borderCountries.append(borderCountryTag)
                    })

            });
        }

    })