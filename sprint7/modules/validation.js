import { createClientServerError } from "./dom-manipulation.js";

export function checkError() {
  const error = document.querySelector(".error-message");

  if (error) {
    error.remove();
  }
}

export function checkErrorType(type) {
  if (type >= 400 && type < 500) {
    handleClientSideErrors(type);
  } else {
    handleServerSideErrors(type);
  }
}

function handleClientSideErrors(clientError) {
  switch (clientError) {
    case 404:
      createClientServerError(
        "404",
        "City not found",
        "City with this name doesn`t exist! Go back, or head over to WeatherForecast to try more!",
        "images/404.png",
        "sad smile face emoji"
      );
      break;
    //free API from OpenWeatherMap is limited to 60 request per minute, 1 request in second, idk if it possible, but yea
    case 429:
      createClientServerError(
        "429",
        "Too many requests!",
        "WeatherForecast is limited to 60 requests per minute! Don`t rush, try slower!",
        "images/429.webp",
        "monitor with keyboard"
      );
      break;
  }
}

function handleServerSideErrors(serverError) {
  switch (serverError) {
    case 500:
      createClientServerError(
        "500",
        "Internal Server Error",
        "Error occurred on OpenWeatherMap API side! Try later!",
        "images/500.png",
        "robot on wheel"
      );
      break;
    case 502:
      createClientServerError(
        "502",
        "Bad Gateway",
        "The OpenWeatherMap server received an invalid response from another server. Try again later!",
        "images/502.png",
        "notepad with pencil"
      );
      break;
    case 503:
      createClientServerError(
        "503",
        "Service Unavailable",
        "The server is temporarily unable to process the request, possibly due to overload or maintenance.",
        "images/503.png",
        "hour glass"
      );
      break;
  }
}
