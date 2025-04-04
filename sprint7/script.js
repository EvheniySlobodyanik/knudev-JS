import { handleWeather } from "./modules/weather.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start").addEventListener("click", () => {
    handleWeather();
  });
});
