require('dotenv').config();
const apiKey = process.env.API_KEY;


async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherInfo = document.getElementById('weatherInfo');

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');

  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}