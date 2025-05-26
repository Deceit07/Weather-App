const apiKey = 'c47cbe8a197594baa6a043b98e148c48'; // Your OpenWeatherMap API key
const options = { method: "GET" };

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const datetime = document.getElementById("datetime");
const weatherIcon = document.getElementById("weatherIcon");
const detailBoxes = document.getElementsByClassName("detail-box");

// Get weather by city
const getWeather = (city) => {
  cityName.innerHTML = city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url, options)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Update Weather Info
      temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
      description.innerHTML = data.weather[0].description;
      datetime.innerHTML = new Date().toLocaleString();
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].main;

      // Update Detail Boxes
      detailBoxes[0].innerHTML = `
        <p>Wind</p>
        <h3>${data.wind.speed} km/h</h3>
        <p>${getDirection(data.wind.deg)}</p>
      `;
      detailBoxes[1].innerHTML = `
        <p>Humidity</p>
        <h3>${data.main.humidity}%</h3>
      `;
      detailBoxes[2].innerHTML = `
        <p>Feels Like</p>
        <h3>${Math.round(data.main.feels_like)}°C</h3>
      `;
    })
    .catch((err) => alert(err.message));
};

// Event listener for search
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") getWeather(city);
});

// Default city on load
getWeather("Delhi");

// Helper function for wind direction
function getDirection(deg) {
  const directions = ["North", "NE", "East", "SE", "South", "SW", "West", "NW"];
  return directions[Math.round(deg / 45) % 8];
}
