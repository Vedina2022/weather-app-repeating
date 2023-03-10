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
function displayWeatherConditions(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

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
}
document.querySelector("#date").innerHTML = formatDate();

//API call
let city = "Mykolaiv";

const apiKey = "acdafd58d2b7bf1eca6d5caa45fe2f0f";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios(apiUrl).then(displayWeatherConditions);
