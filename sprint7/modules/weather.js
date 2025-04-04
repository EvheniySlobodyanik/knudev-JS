import { handleStart } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { handleWeatherData } from "./dom-manipulation.js";

import { checkError } from "./validation.js";

const cityInput = document.getElementById("city-input");
const cityButton = document.getElementById("search");

const selectLanguage = document.getElementById("language");

cityButton.addEventListener("click", async () => {
  const city = cityInput.value;
  if (city) {
    cityInput.value = "";
    getWeather(city);
  } else {
    createErrorMessage("Please enter a city!");
  }
});

async function getWeather(city) {
  checkError();
  try {
    const apiKey = "8b0d848ff37487448ccb91aa531c1ab8";
    const currentLang =
      selectLanguage.options[selectLanguage.selectedIndex]?.value || "en";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLang}`
    );
    const data = await response.json();

    if (!response.ok || data.error) {
      createErrorMessage("City with this name doesn't exist!");
      return;
    }

    if (data.cod === 200) {
      const weatherBlock = document.querySelector(".weather-block");

      if (weatherBlock) {
        weatherBlock.remove();
      }

      handleWeatherData(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function handleWeather() {
  handleStart();
}
