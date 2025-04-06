import { removeExpiredWeatherBlocks } from "./dom-manipulation.js";

let countdownInterval = null;

export function setLocalStorage(key, value) {
  const dataWithTimestamp = {
    value,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(dataWithTimestamp));

  startExpirationCountdown();
}

export function getLocalStorage(key) {
  const rawData = localStorage.getItem(key);
  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);
  const currentTime = Date.now();

  if (currentTime - parsedData.timestamp > 600000) {
    removeLocalStorage(key);
    removeExpiredWeatherBlocks();
    console.log("⏳ Cached data expired! Removing weather blocks...");
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
  const rawData = localStorage.getItem("weather-data");
  const timer = document.getElementById("timer");

  if (!rawData || !timer) return;

  const parsedData = JSON.parse(rawData);
  const expirationTime = parsedData.timestamp + 600000;
  let remainingTime = Math.max(
    Math.floor((expirationTime - Date.now()) / 1000),
    0
  );

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  function updateTimer() {
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      removeLocalStorage("weather-data");
      removeExpiredWeatherBlocks();
      timer.textContent = "Cache expired!";
      console.log("🚮 Cache expired! Weather blocks removed.");
      return;
    }

    timer.textContent = `Cache expires in ${remainingTime} seconds`;
    remainingTime--;
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}
