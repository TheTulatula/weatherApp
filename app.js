let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");

let div = document.querySelector(".currentTime");

function submitSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searchInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let city = searchInput.value;
  let apiKey = `f80eot135d2ba84faf905b0d90035259`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", submitSearch);

function displayCurrentWeather(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.temperature.current);
  let currentCity = response.data.city;
  let div = document.querySelector(".mainCurrentTemp");
  div.innerHTML = `${temperature}`;

  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let weatherDescription = response.data.condition.description;

  document.querySelector(
    ".humidityWind"
  ).innerHTML = `Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>`;
  document.querySelector(
    ".currentTime"
  ).innerHTML = `${day}, ${hours}:${minutes}, ${weatherDescription}`;
}
