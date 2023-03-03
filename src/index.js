let todayDate = document.querySelector(".todays-date");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let now = new Date();
let weekDay = weekDays[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

todayDate.innerHTML = `${weekDay}, ${month} ${date}, ${year} ${hour}:${minutes}`;

//
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-location");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  searchCurrentCity(searchInput.value);
}

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", showCity);

//
let temperature = document.querySelector(".todays-temp");

function showCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = `2`;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = `70`;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

//

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".todays-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchCurrentCity(city) {
  let apiKey = "80a4d0db16a590f9952e17295643238f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchPosition(position) {
  let apiKey = "cbe5ec6ebba0032d4a68101678db29003";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentLocation = document.querySelector("#current-button");

currentLocation.addEventListener("click", getCurrentLocation);
