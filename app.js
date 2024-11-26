document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  const cityInput = document.querySelector(".city-input");
  const temperatureText = document.querySelector(".temp-txt");
  const conditionText = document.querySelector(".condition-txt");
  const humidityValue = document.querySelector(".humidity-value-txt");
  const windValue = document.querySelector(".wind-value-txt");
  const countryText = document.querySelector(".country-txt");
  const currentDateText = document.querySelector(".current-date-txt");

  const apiKey = "5b144d241d785232eaf4ac4ed0bcf414";

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
      getWeatherData(city);
    }
  });

  async function getWeatherData(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      updateWeatherInfo(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function updateWeatherInfo(data) {
    const { main, weather, wind, name, sys } = data;

    temperatureText.textContent = `${main.temp} ℃`;
    conditionText.textContent = weather[0].description;
    humidityValue.textContent = `${main.humidity}%`;
    windValue.textContent = `${wind.speed}km/h`;
    countryText.textContent = `${name}, ${sys.country}`;

    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    currentDateText.textContent = currentDate.toLocaleDateString(
      "en-US",
      options
    );
  }
});
