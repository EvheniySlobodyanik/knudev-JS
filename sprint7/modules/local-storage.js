import { removeExpiredWeatherBlocks } from "./dom-manipulation.js";

let countdownInterval = null;

export function setLocalStorage(key, value) {
  const dataWithTimestamp = {
    value,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(dataWithTimestamp));

  if (key === "weather-data" && !getLocalStorage("cache-expiration")) {
    setLocalStorage("cache-expiration", Date.now() + 600000);
    startExpirationCountdown();
  }
}

export function getLocalStorage(key) {
  const rawData = localStorage.getItem(key);
  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);
  const currentTime = Date.now();

  if (currentTime - parsedData.timestamp > 600000) {
    removeLocalStorage(key);
    removeExpiredWeatherBlocks();
    console.log("Cached data expired! Removing weather blocks...");
    return null;
  }

  return parsedData.value;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
  clearInterval(countdownInterval);
  countdownInterval = null;
}

export function startExpirationCountdown() {
  const timer = document.getElementById("timer");
  if (!timer) {
    console.error("Timer missing in DOM!");
    return;
  }

  let expirationData = localStorage.getItem("cache-expiration");
  let expirationTime = expirationData
    ? parseInt(expirationData)
    : Date.now() + 600000;

  if (!expirationData || isNaN(expirationTime)) {
    expirationTime = Date.now() + 600000;
    setLocalStorage("cache-expiration", expirationTime);
  }

  let remainingTime = Math.max(
    Math.floor((expirationTime - Date.now()) / 1000),
    0
  );

  clearInterval(countdownInterval);

  function updateTimer() {
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      removeLocalStorage("weather-data");
      removeLocalStorage("cache-expiration");
      removeExpiredWeatherBlocks();
      timer.textContent = "Cache expired!";
      return;
    }

    timer.textContent = `Cache expires in ${remainingTime} seconds`;
    remainingTime--;
  }

  countdownInterval = setInterval(updateTimer, 1000);
  updateTimer();
}
