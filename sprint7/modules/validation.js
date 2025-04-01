export async function checkCity(key, inputValue) {
  const error = document.querySelector(".error-message");

  if (error) {
    error.remove();
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}`
    );
    if (response.ok) {
      console.log("Exists!");
      return true;
    } else {
      console.log("Don`t exist!");
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
}
