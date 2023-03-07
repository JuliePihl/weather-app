search("Copenhagen");

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=708f30e015d511ca8fcc8b34a81d39cd`;
  axios.get(apiUrl).then(showWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-field").value;
  search(city);
}

function searchMyLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=708f30e015d511ca8fcc8b34a81d39cd`;
  axios.get(apiUrl).then(showWeatherInfo);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}

function showDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let day = days[today.getDay()];
  let month = months[today.getMonth()];
  let dateOfMonth = today.getDate();
  let year = today.getFullYear();
  return `${day} ${month} / ${dateOfMonth} / ${year}`;
}

function showTime(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 45;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 7;
}

function showWeatherInfo(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let icon = document.querySelector("#weather-icon");

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )} C°`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m / s`;
  description.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

//showDate function
let today = new Date();
let date = document.querySelector("#date");
date.innerHTML = showDate(today);

//showTime function
let now = new Date();
let time = document.querySelector("#time");
time.innerHTML = showTime(now);

//convertToFahrenheit function
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

//convertToCelsius function
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

//handleSubmit function
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// getMyLocation function
let locationButton = document.querySelector("#location-btn");
locationButton.addEventListener("click", getMyLocation);
