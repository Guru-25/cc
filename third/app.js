const API_KEY = 'e6d4a87006473c5823fa8247336d87b4'; // Replace with your API key

const weatherForm = document.getElementById('weatherForm');
const weatherDisplay = document.getElementById('weatherDisplay');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('city').value;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
});

function displayWeather(data) {
  weatherDisplay.innerHTML = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  `;
}

let favoriteCities = [];

function saveCity(city) {
  if (!favoriteCities.includes(city)) {
    favoriteCities.push(city);
    alert(`${city} has been added to favorites.`);
  } else {
    alert(`${city} is already in your favorites.`);
  }
}

function displayFavorites() {
    if (favoriteCities.length === 0) {
      alert('No favorite cities saved.');
      return;
    }
    alert(`Favorite Cities:\n${favoriteCities.join(', ')}`);
  }

  function deleteCity(city) {
    const index = favoriteCities.indexOf(city);
    if (index > -1) {
      favoriteCities.splice(index, 1);
      alert(`${city} has been removed from favorites.`);
    } else {
      alert(`${city} is not in your favorites.`);
    }
  }
    