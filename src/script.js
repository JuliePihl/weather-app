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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=metric&key=4f8936d039ct62ob3b4f9d73a4bb6536`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-day">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        width="42"
      />
      <div class="forecast-temperatures">
        <span class="forecast-max-temp"> ${Math.round(
          forecastDay.temperature.maximum
        )} </span>
          |
        <span class="forecast-min-temp"> ${Math.round(
          forecastDay.temperature.minimum
        )} </span>
      </div>
    </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&units=metric&key=4f8936d039ct62ob3b4f9d73a4bb6536`;
  axios.get(apiUrl).then(showForecast);
}

function showWeatherInfo(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let icon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.temperature.current;

  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(celsiusTemperature);
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )} C°`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m / s`;
  description.innerHTML = `${response.data.condition.description}`;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
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

let celsiusTemperature = null;

search("Copenhagen");
