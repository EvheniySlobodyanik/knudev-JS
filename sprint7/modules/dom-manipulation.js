const header = document.getElementById("warning-header");

const todayWeatherSection = document.getElementById("weather-today");
const containerCity = document.getElementById("container-city");

const forecastSection = document.getElementById("forecast-section");
const forecastTodayTitle = document.getElementById("fore-today");
const forecastTitle = document.getElementById("fore-title");

const hourlyTitle = document.getElementById("hourly-title");
const hourlyContainer = document.getElementById("container-hourly");
const hourlyForecastSection = document.getElementById("hourly-forecast");

const body = document.querySelector(".body");
const main = document.querySelector(".main");

const refreshBtn = document.getElementById("refresh");

const containerTimer = document.getElementById("container-timer");

export function handleStart() {
  header.style.display = "none";
}

export function createErrorMessage(message) {
  const para = document.createElement("p");
  para.textContent = message;
  para.classList.add("error-message");

  containerCity.appendChild(para);
}

export function addOptionToSelect(array, className, parent) {
  array.forEach((item) => {
    const option = document.createElement("option");
    option.classList.add(className);
    option.textContent = item;
    option.value = item;
    parent.appendChild(option);
  });
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
  forecastTodayTitle.style.display = "flex";
  containerTimer.style.display = "block";

  let existingBlock = document.querySelector(".weather-block");
  if (existingBlock) existingBlock.remove();

  const weatherBlock = createBlock("weather-block", todayWeatherSection);

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
  const temperature = data.main?.temp ?? "N/A";

  createPara(
    "city-temperature",
    `Temperature: ${temperature}°C`,
    weatherDescriptionContainer
  );
  const wind = data.wind?.speed ?? "N/A";
  createPara(
    "city-wind",
    `Wind speed: ${wind} m/s`,
    weatherDescriptionContainer
  );
  const humidity = data.main?.humidity ?? "N/A";
  createPara(
    "city-humidity",
    `Humidity: ${humidity}%`,
    weatherDescriptionContainer
  );
  const conditions = data.weather?.[0]?.description ?? "Unknown";
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

function loopThroughForecast(groupedByDate) {
  forecastTitle.style.display = "flex";
  const fiveDayForecastBlock = createBlock("five-forecast", forecastSection);
  for (const date in groupedByDate) {
    if (groupedByDate.hasOwnProperty(date)) {
      const entries = groupedByDate[date];

      const temps = entries.map((e) => e.main.temp);
      const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(
        1
      );
      const description = entries?.[0]?.weather?.[0]?.description ?? "No Data";

      const div = createBlock("forecast-day", fiveDayForecastBlock);
      createPara("day-time", `Date: ${date}`, div);
      createPara("day-temp", `Average temperature: ${avgTemp}°C`, div);
      createPara("day-description", `Condition: ${description}`, div);

      console.log(
        `${date}: Avg Temp = ${avgTemp}°C, Condition = ${description}`
      );
    }
  }
}

function displayFiveDayForecast(groupedByDate) {
  const forecasts = document.querySelectorAll(".forecast-day");

  forecasts.forEach((forecast) => forecast.remove());

  loopThroughForecast(groupedByDate);
}

function handleHourlyForecast(data) {
  const today = new Date().toISOString().split("T")[0];

  const todayForecast = data.list.filter((item) =>
    item.dt_txt.startsWith(today)
  );

  hourlyTitle.style.display = "flex";
  hourlyForecastSection.style.display = "flex";

  const previousEntries = hourlyContainer.querySelectorAll(".hourly-entry");
  previousEntries.forEach((entry) => entry.remove());

  todayForecast.forEach((entry) => {
    const time = entry.dt_txt.split(" ")[1];
    const temperature = entry.main?.temp ?? "N/A";
    const wind = entry.wind?.speed ?? "N/A";
    const humidity = entry.main?.humidity ?? "N/A";
    const iconCode = entry.weather?.[0]?.icon ?? "default";
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const forecastContainer = createBlock("hourly-entry", hourlyContainer);

    createPara("hourly-time", `Time: ${time}`, forecastContainer);
    createPara("hourly-temp", `Temp: ${temperature}°C`, forecastContainer);
    createPara("hourly-wind", `Wind: ${wind} m/s`, forecastContainer);
    createPara("hourly-humidity", `Humidity: ${humidity} %`, forecastContainer);
    forecastContainer.appendChild(
      createImage(
        iconUrl,
        entry.weather?.[0]?.description ?? "Weather",
        "hourly-image"
      )
    );
  });
}

function GetForecastForFiveDays(data) {
  if (!data.list || !Array.isArray(data.list)) {
    console.error("Invalid forecast data:", data);
    return;
  }

  let groupedByDate = {};
  const today = new Date().toISOString().split("T")[0];

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (date === today) return;

    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });
  displayFiveDayForecast(groupedByDate);
}

export function handleWeatherData(data1, data2) {
  removeExpiredWeatherBlocks();

  displayWeather(data1);
  GetForecastForFiveDays(data2);
  refreshBtn.style.display = "block";

  handleHourlyForecast(data2);
}

export function createClientServerError(
  message1,
  message2,
  message3,
  imgSrc,
  imgAlt
) {
  main.style.display = "none";
  refreshBtn.style.display = "none";

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

export function removeExpiredWeatherBlocks() {
  refreshBtn.style.display = "none";
  forecastTodayTitle.style.display = "none";
  forecastTitle.style.display = "none";
  hourlyTitle.style.display = "none";
  containerTimer.style.display = "none";

  const weatherBlock = document.querySelector(".weather-block");
  const fiveDayForecastBlock = document.querySelector(".five-forecast");

  if (weatherBlock) weatherBlock.remove();
  if (fiveDayForecastBlock) fiveDayForecastBlock.remove();
  if (hourlyContainer) {
    const previousEntries = hourlyContainer.querySelectorAll(".hourly-entry");
    previousEntries.forEach((entry) => entry.remove());
  }
}
