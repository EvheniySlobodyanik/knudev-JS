const header = document.getElementById("warning-header");

const sectionCity = document.getElementById("weather-section");
const containerCity = document.getElementById("container-city");

export function handleStart() {
  header.style.display = "none";
}

export function createErrorMessage(message) {
  const para = document.createElement("p");
  para.textContent = message;
  para.classList.add("error-message");

  containerCity.appendChild(para);
}

function createBlock(blockName, parent) {
  const container = document.createElement("div");
  container.classList.add(blockName);

  parent.appendChild(container);
}

function createPara(className, text, parent) {
  const para = document.createElement("p");
  para.classList.add(className);
  para.textContent = text;

  parent.appendChild(para);
}

function displayWeather(data) {
  const weatherBlock = document.querySelector(".weather-block");

  const cityName = data.name;
  createPara("city-name", `City name: ${cityName}`, weatherBlock);
  const temperature = data.main.temp;
  createPara("city-temperature", `Temperature: ${temperature}°C`, weatherBlock);
  const humidity = data.main.humidity;
  createPara("city-humidity", `Humidity: ${humidity}%`, weatherBlock);
  const conditions = data.weather[0].description;
  createPara("city-conditions", `Condition: ${conditions}`, weatherBlock);
}

export function handleWeatherData(data) {
  createBlock("weather-block", sectionCity);
  displayWeather(data);
}
