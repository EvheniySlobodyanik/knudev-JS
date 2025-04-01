import { handleWeather } from "./modules/weather.js";

document.getElementById("start").addEventListener("click", () => {
  handleWeather();
});
