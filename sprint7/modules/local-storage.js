let countdownInterval; // Global variable to store the countdown reference

export function setLocalStorage(key, value) {
  const dataWithTimestamp = {
    value,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(dataWithTimestamp));

  startExpirationCountdown(key); // Start countdown (or reset if already running)
}

export function getLocalStorage(key) {
  const rawData = localStorage.getItem(key);
  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);
  const currentTime = Date.now();

  if (currentTime - parsedData.timestamp > 600000) {
    // 600 sec (10 min)
    removeLocalStorage(key);
    removeExpiredWeatherBlocks();
    console.log("⏳ Cached data expired! Removing weather blocks...");
    return null;
  }

  return parsedData.value;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
  clearInterval(countdownInterval); // Stop countdown when cache is removed
}

function startExpirationCountdown(key) {
  let remainingTime = 600; // Set to 600 seconds (10 min)

  // Clear any existing interval before starting a new one
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    console.log(`⏳ Cache expires in ${remainingTime} seconds`);
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      removeLocalStorage(key);
      removeExpiredWeatherBlocks();
      console.log("🚮 Cache expired! Weather blocks removed.");
    }
  }, 1000);
}
