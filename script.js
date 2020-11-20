function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function fahrenheitButton(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = 51;
}
function celsiusButton(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = 11;
}

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let fButton = document.querySelector("#fahrenheit");
fButton.addEventListener("click", fahrenheitButton);
let cButton = document.querySelector("#celsius");
cButton.addEventListener("click", celsiusButton);

//Week 5 homework:
function showTemperature(response) {
  console.log(response.data);
  let currentCityElement = document.querySelector("#search-outcome");
  let currentCity = response.data.name;
  let description = document.querySelector("#description");
  let tempElement = document.querySelector("#temp");
  let realFeel = document.querySelector("#feeling");
  let feel = Math.round(response.data.main.feels_like);
  let wind = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  currentCityElement.innerHTML = `${currentCity}`;
  description.innerHTML = `${response.data.weather[0].main}`;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  realFeel.innerHTML = `Real feel ${feel}°C`;
  wind.innerHTML = `Wind: ${windSpeed}m/s`;
}
function currentLocation(position) {
  let apiKey = "ac0f4954f2276c6ad1120e7edce5fa23";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#search-outcome");
  city.innerHTML = `${searchInput.value}`
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
  let cityName = searchInput.value;
  let apiKey = "ac0f4954f2276c6ad1120e7edce5fa23";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#location");
currentButton.addEventListener("click", showCurrentLocation);
let showCity = document.querySelector("#search");
showCity.addEventListener("submit", search);
