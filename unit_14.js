const param = {
  url: 'https://api.openweathermap.org/data/2.5/',
  appid: '3abc0cc30bee6a7a79d61d60a3efd125',
};
const cities = {
  703448: 'Kyiv',
  8260265: 'Buutuo',
  5336269: 'Chico',
  8277210: 'Beldibi',
};

const select = document.createElement('select');
select.classList.add('city');
document.querySelector('.city__selection').append(select);

for (let key in cities) {
  const option = document.createElement('option');
  option.value = key;
  option.text = cities[key];
  select.appendChild(option);
}

function getWeather() {
  const cityId = document.querySelector('.city').value;

  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then(weather => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  console.log(data);

  document.querySelector('.temp').innerHTML =
    Math.round(data.main.temp) + '&deg;';
  document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' ' + 'm/s';
  document.querySelector('.pressure').innerHTML =
    data.main.pressure + ' ' + 'mmHg';
  document.querySelector('.clouds').textContent =
    data.weather[0]['description'];
  document.querySelector(
    '.icon__clouds li',
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
}

getWeather();
document.querySelector('.city').onchange = getWeather;
