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

function dailyForecast(response) {
  console.log(response);
  let dailyForecast = document.querySelector(".daily-forecast");
  let forecastSection = `<div class="row">`;
  let forecastDays = ["Sun", "Mon", "Tue", "Wed"];

  forecastDays.forEach(function (day) {
    forecastSection =
      forecastSection +
      `<div class="col-2">
                <div class="forecast-day">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                  alt="cloudy icon"
                  class="forecast-icon"
                  width="40"
                />
                <div class="forecast-temperature">
                  <span class="max-temperature">-6°</span>
                  <span class="min-temperature">-13°</span>
                </div>
              </div>`;
  });

  forecastSection = forecastSection + `</div>`;
  dailyForecast.innerHTML = forecastSection;
}

function getDailyForecast(coordinates) {
  const apiKey = "acdafd58d2b7bf1eca6d5caa45fe2f0f";
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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
  const apiKey = "acdafd58d2b7bf1eca6d5caa45fe2f0f";
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
