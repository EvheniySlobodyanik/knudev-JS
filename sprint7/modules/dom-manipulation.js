const header = document.getElementById("warning-header");

const sectionCity = document.getElementById("weather-section");
const containerCity = document.getElementById("container-city");

const body = document.querySelector(".body");
const main = document.querySelector(".main");

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
  return container;
}

function createPara(className, text, parent) {
  const para = document.createElement("p");
  para.classList.add(className);
  para.textContent = text;

  parent.appendChild(para);
}

function createImage(src, alt, imageClass) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(imageClass);
  return img;
}

function createButton(buttonText, className, parent) {
  const button = document.createElement("button");
  button.classList.add(`${className}`);
  button.textContent = buttonText;
  parent.appendChild(button);
}

function displayWeather(data) {
  const weatherBlock = createBlock("weather-block", sectionCity);

  const weatherDescriptionContainer = createBlock(
    "weather-description-container",
    weatherBlock
  );
  const weatherImageContainer = createBlock(
    "weather-image-container",
    weatherBlock
  );

  const cityName = data.name;
  createPara(
    "city-name",
    `City name: ${cityName}`,
    weatherDescriptionContainer
  );
  const temperature = data.main.temp;
  createPara(
    "city-temperature",
    `Temperature: ${temperature}°C`,
    weatherDescriptionContainer
  );
  const wind = data.wind.speed;
  createPara(
    "city-wind",
    `Wind speed: ${wind} m/s`,
    weatherDescriptionContainer
  );
  const humidity = data.main.humidity;
  createPara(
    "city-humidity",
    `Humidity: ${humidity}%`,
    weatherDescriptionContainer
  );
  const conditions = data.weather[0].description;
  createPara(
    "city-conditions",
    `Condition: ${conditions}`,
    weatherDescriptionContainer
  );

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const img = createImage(iconUrl, conditions, "city-image");
  weatherImageContainer.appendChild(img);
}

export function handleWeatherData(data) {
  displayWeather(data);
}

export function createClientServerError(
  message1,
  message2,
  message3,
  imgSrc,
  imgAlt
) {
  main.style.display = "none";

  const container = document.createElement("div");
  container.classList.add("error-display");

  const errorImage = createImage(imgSrc, imgAlt, "error-img");

  container.appendChild(errorImage);
  createPara("message-title", message1, container);
  createPara("message-description", message2, container);
  createPara("message-note", message3, container);
  createButton("Go back", "error-button", container);

  body.appendChild(container);
}

body.addEventListener("click", (event) => {
  if (event.target.classList.contains("error-button")) {
    main.style.display = "flex";
    const errorBlock = document.querySelector(".error-display");
    if (errorBlock) errorBlock.remove();
  }
});
