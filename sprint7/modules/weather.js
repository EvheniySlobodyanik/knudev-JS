import { handleStart } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { handleWeatherData } from "./dom-manipulation.js";
import { removeExpiredWeatherBlocks } from "./dom-manipulation.js";
import { addOptionToSelect } from "./dom-manipulation.js";

import { checkError } from "./validation.js";
import { checkErrorType } from "./validation.js";

import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  startExpirationCountdown,
} from "./local-storage.js";

const cityInput = document.getElementById("city-input");
const cityButton = document.getElementById("search");

const selectFavorite = document.getElementById("select-favorite");
const favoriteButton = document.getElementById("add-favorite");
const chooseButton = document.getElementById("choose-favorite");
const deleteButton = document.getElementById("delete-favorite");

const selectLanguage = document.getElementById("language");

const refreshButton = document.getElementById("refresh");

document.addEventListener("DOMContentLoaded", () => {
  const savedData = getLocalStorage("weather-data");

  if (savedData) {
    removeExpiredWeatherBlocks();
    handleWeatherData(savedData.current, savedData.forecast);

    startExpirationCountdown();
  }

  let favoriteCities = getLocalStorage("select-option") ?? [];
  if (favoriteCities) {
    addOptionToSelect(favoriteCities, "select-option", selectFavorite);
  }
});

cityButton.addEventListener("click", async () => {
  const city = cityInput.value;
  if (city) {
    cityInput.value = "";

    removeExpiredWeatherBlocks();
    getWeather(city);

    startExpirationCountdown();
  } else {
    createErrorMessage("Please enter a city!");
  }
});

favoriteButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;

  let favoriteCities = getLocalStorage("select-option") ?? [];

  if (!favoriteCities.includes(city)) {
    favoriteCities.push(city);
    setLocalStorage("select-option", favoriteCities);

    addOptionToSelect([city], "select-option", selectFavorite);
  }

  cityInput.value = "";
});

chooseButton.addEventListener("click", () => {
  const selectValue = selectFavorite.value;
  if (selectValue) {
    getWeather(selectValue);
    startExpirationCountdown();
  }
});

deleteButton.addEventListener("click", () => {
  const selectedCity = selectFavorite.value;

  let favoriteCities = getLocalStorage("select-option") ?? [];

  const updatedCities = favoriteCities.filter((city) => city !== selectedCity);

  setLocalStorage("select-option", updatedCities);

  const selectedOption = selectFavorite.querySelector(
    `option[value="${selectedCity}"]`
  );
  if (selectedOption) {
    selectedOption.remove();
  }
});

refreshButton.addEventListener("click", () => {
  removeLocalStorage("weather-data");
  removeExpiredWeatherBlocks();
  console.log("🔄 Refresh pressed! Cache reset to 600 seconds.");

  const city = cityInput.value || "Kyiv";
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  checkError();

  removeLocalStorage("weather-data");

  try {
    const apiKey = "8b0d848ff37487448ccb91aa531c1ab8";
    const currentLang =
      selectLanguage.options[selectLanguage.selectedIndex]?.value || "en";

    const [response1, response2] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLang}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=${currentLang}`
      ),
    ]);

    const [data1, data2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);

    console.log("📅 5-Day Forecast:", data2);

    if (!response1.ok || data1.error) {
      console.log(data1.cod);
      checkErrorType(data1.cod);
      return;
    }

    if (!response2.ok || data2.cod !== "200") {
      console.error("Forecast data fetch error:", data2);
      checkErrorType(data2.cod);
      return;
    }

    if (data1.cod === 200) {
      if (data2.list) {
        handleWeatherData(data1, data2);

        setLocalStorage("weather-data", { current: data1, forecast: data2 });
        startExpirationCountdown();
      } else {
        console.error("Invalid forecast data:", data2);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function handleWeather() {
  handleStart();
}
