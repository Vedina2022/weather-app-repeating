//Get response from OpenWeather API for displaying actual data
/* function formatDate(timeStamp) {
  let date = new Date(timeStamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 0) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
} */

function formatDate() {
  let date = new Date();
  let options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

document.querySelector("#date").innerHTML = formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = {
    weekday: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

function dailyForecast(response) {
  console.log(response);

  let forecast = response.data.daily;
  let dailyForecast = document.querySelector(".daily-forecast");
  let forecastSection = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let tempMax = Math.round(forecastDay.temp.max);
    let tempMin = Math.round(forecastDay.temp.min);

    if (index < 6) {
      forecastSection =
        forecastSection +
        `<div class="col-2">
                <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="cloudy icon"
                  class="forecast-icon"
                  width="40"
                />
                <div class="forecast-temperature">
                  <span class="max-temperature">${tempMax}°</span>
                  <span class="min-temperature">${tempMin}°</span>
                </div>
              </div>`;
    }
  });

  forecastSection = forecastSection + `</div>`;
  dailyForecast.innerHTML = forecastSection;
}

function getDailyForecast(coordinates) {
  const apiKey = "8ba8b8217c4a2ce52cbe796f7c063cea";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyForecast);
}

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#temperature").innerHTML = celsiusTemperature;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  /*   document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ); */

  let iconElement = document.querySelector("#weather-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getDailyForecast(response.data.coord);
}

//API call
function search(city) {
  const apiKey = "8ba8b8217c4a2ce52cbe796f7c063cea";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = "";
let temperatureElement = document.querySelector("#temperature");

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

const fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Mykolaiv");
