import { handleStart, handleWeatherData } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";

import { checkCity } from "./validation.js";

const cityInput = document.getElementById("city-input");
const cityButton = document.getElementById("search");

cityButton.addEventListener("click", async () => {
  const key = "c9ebd44a0ba590687f782f50141bc9ae";

  let existing = await checkCity(key, cityInput.value);

  if (existing) {
    getWeather();
    cityInput.value = "";
  } else {
    createErrorMessage("City with this name doesn`t exist!");
  }
});

async function getWeather() {
  const key = "c9ebd44a0ba590687f782f50141bc9ae";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`
    );
    const data = await response.json();

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
