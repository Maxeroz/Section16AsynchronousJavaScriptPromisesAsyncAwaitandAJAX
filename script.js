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


// Asynchronous Behind the Scenes: The Event Loop

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}

  console.log(res);
});

console.log('Test end');


// Building a Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() < 0.5) {
      resolve('You WIN 💰');
    } else reject('You lost your money 💩');
  }, 2000);
});

console.log(lotteryPromise);
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// Promisifying the Geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

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
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=715881696036124439037x17745`,
        {}
      );
    })
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`${errorMsg}`);
      console.log(response.status);

      return response.json();
    })
    .then(data => {
      console.log(data);
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

btn.addEventListener('click', whereAmI);
*/

/*
// Coding Challenge #2

const imgContainer = document.querySelector('.images');
let currentImg;
const images = document.getElementsByTagName('img');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    currentImg = document.createElement('img');
    currentImg.src = imgPath;

    currentImg.addEventListener('load', () => {
      console.log('Image is loading');
      imgContainer.appendChild(currentImg);

      resolve(currentImg);
    });

    currentImg.addEventListener('error', () => {
      reject(new Error('Image is not found'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(() => wait(2))
  .then(() => (currentImg.style.display = 'none'))
  .then(() => createImage('img/img-2.jpg'))
  .then(() => wait(2))
  .then(() => (currentImg.style.display = 'none'));

// async function test() {
//   console.log('Hi from test() 1');
//   await console.log('Hi from test() 2');
//   console.log('Hi from test() 3');
// }

// console.log('Start');
// test();
// console.log('End');

/*
function timeout(cb, ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cb());
    }, ms);
  });
}

async function fetchCountryData(country) {
  await timeout(() => console.log('hi from setTimeout'), 3000);
  const data = await fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}}`
  );
  console.log(data);
}

// fetchCountryData('russia');

const newPromise = new Promise.resolve('Hello from promise one').then(resp =>
  console.log(resp)
);

// Error Handling With try...catch

// Consuming Promises with Async/Await

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
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
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=715881696036124439037x17745`,
      {}
    );

    if (!resGeo.ok) {
      throw new Error(`Problem getting location`);
    }
    const dataGeo = await resGeo.json();

    // Coutry data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) {
      throw new Error(`Problem getting country`);
    }
    const [data] = await res.json();
    renderCountry(data);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(` ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// whereAmI();
// console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

///////////////////////////////////////
// Returning Values from Async Functions

// console.log('1: Will get location');
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// (async function () {
//   try {
//     console.log('1: Will get location');
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();

// Running Promises in Parallel

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );

    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);

    console.log(data);

    console.log(data.map(([el]) => el.capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('russia', 'netherlands', 'italia');

// Promise.race
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

(async function () {
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
  ]);

  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled

Promise.allSettled([
  Promise.resolve('Siccess'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Siccess'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/

// Coding Challenge #3

// Part I

const imgContainer = document.querySelector('.images');
// let currentImg;
const images = document.getElementsByTagName('img');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    let currentImg;
    currentImg = document.createElement('img');
    currentImg.src = imgPath;

    currentImg.addEventListener('load', () => {
      console.log('Image is loading');
      imgContainer.appendChild(currentImg);

      resolve(currentImg);
    });

    currentImg.addEventListener('error', () => {
      reject(new Error('Image is not found'));
    });
  });
};

/*
(async function () {
  try {
    // Load image 1
    let loadImage = await createImage('img/img-1.jpg');
    let waiteFor = await wait(2);
    currentImg.style.display = 'none';

    // Load image 2
    loadImage = await createImage('img/img-2.jpg');
    waiteFor = await wait(2);
    currentImg.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
})();
*/

// Part II

const loadAll = async function (imgArr) {
  const imgs = imgArr.map(img => createImage(img));
  console.log(imgs);

  const actualImgs = await Promise.all(imgs);
  console.log(actualImgs);

  actualImgs.forEach(img => img.classList.add('parallel'));
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
