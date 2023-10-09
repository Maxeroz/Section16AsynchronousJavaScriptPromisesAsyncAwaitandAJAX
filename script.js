'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// Asynchronous JavaScript, AJAX and APIs

// Our First AJAX Call: XMLHttpRequest

// const getCoutryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     console.log(data);

//     const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                   +data.population / 1000000
//                 ).toFixed(1)} people</p>
//                 <p class="country__row"><span>🗣️</span>${
//                   data.languages[0].name
//                 }</p>
//                 <p class="country__row"><span>💰</span>${
//                   data.currencies[0].name
//                 }</p>
//             </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCoutryData('russia');
// getCoutryData('belarus');

// [OPTIONAL] How the Web Works: Requests and Responses

// const getCoutryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)

//     const neighbours = data.borders;
//     console.log(neighbours);

//     if (!neighbours) return;

// // AJAX call country 2
// const request2 = new XMLHttpRequest();
// request2.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
// );
// request2.send();

// request2.addEventListener('load', function () {
//   const data2 = JSON.parse(this.responseText);
//   console.log(data2);

//   renderCountry(data2, 'neighbour');
// });

//     neighbours.forEach(neigh => {
//       // AJAX call for all neighbour countries
//       const requestRest = new XMLHttpRequest();
//       requestRest.open(
//         'GET',
//         `https://countries-api-836d.onrender.com/countries/alpha/${neigh}`
//       );

//       requestRest.send();
//       requestRest.addEventListener('load', function () {
//         const dataNeigh = JSON.parse(this.responseText);
//         console.log(dataNeigh);

//         renderCountry(dataNeigh, 'neighbour');
//       });
//     });
//   });
// };

// getCoutryAndNeighbour('russia');

// Promises and the Fetch API

// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/russia`
// );
// console.log(request);

// setTimeout(() => console.log(request), 3000);

// Consuming Promises

// const getCoutryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (repsonse) {
//       console.log(repsonse);

//       return repsonse.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Chaining Promises

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCoutryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'asdjfg';

//       // Country 2

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCoutryData = function (country) {
  // Country 1
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      // const neighbour = 'sdfsdf';

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Handling Rejected Promises

btn.addEventListener('click', function () {
  getCoutryData('australia');
});

// getCoutryData('asddfh');

*/
// Coding Challenge #1

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const whereAmI = function (
  lat,
  lng,
  API_GEO_KEY,
  errorMsg = 'Something went wrong'
) {
  return fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_GEO_KEY}`,
    {}
  )
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`${errorMsg}`);
      console.log(response.status);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);

      if (data.city && data.coutry) {
        console.log(`You are in ${data.city}, ${data.country}`);
      }
      if (!data.city && !data.country) {
        throw new Error(`Check your coordintaes and try again`);
      }

      return data;
    })
    .then(data => {
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country is not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      // const neighbour = '';

      if (!neighbour) throw new Error('Country does not have neighbours');

      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error('Country not found');

      return response.json();
    })
    .then(data => {
      console.log(data);

      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error(`${err.message} 💥💥💥`);

      renderError(`${err.message} 💥💥💥`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmI(52.508, 13.381, '715881696036124439037x17745');
// whereAmI(19.037, 72.873, '715881696036124439037x17745');
// whereAmI(-33.933, 18.474, '715881696036124439037x17745');
