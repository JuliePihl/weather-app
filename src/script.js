search("Copenhagen");

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=4f8936d039ct62ob3b4f9d73a4bb6536&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-field").value;
  search(city);
}

function searchMyLocation(position) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=4f8936d039ct62ob3b4f9d73a4bb6536`;
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

  city.innerHTML = response.city;
  temperature.innerHTML = Math.round(response.temperature.current);
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.temperature.feels_like
  )} C°`;
  humidity.innerHTML = `Humidity: ${response.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${Math.round(response.wind.speed)} m / s`;
  description.innerHTML = `${response.condition.description}`;
  icon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.condition.icon_url}.png`
  );
  icon.setAttribute("alt", response.condition.description);
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
