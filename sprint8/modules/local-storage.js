export function cacheDataWithExpiration(key, value, expirationTimeInSeconds) {
  const expirationTimestamp = Date.now() + expirationTimeInSeconds * 1000;
  const dataWithExpiration = { value, expirationTimestamp };
  localStorage.setItem(key, JSON.stringify(dataWithExpiration));
}

export function getExpiringData(key) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    const { value, expirationTimestamp } = JSON.parse(storedValue);
    if (Date.now() < expirationTimestamp) {
      return value;
    }
    //Cache has expired
    localStorage.removeItem(key);
  }
  return null;
}
