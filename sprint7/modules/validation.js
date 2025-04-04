export function checkError() {
  const error = document.querySelector(".error-message");

  if (error) {
    error.remove();
  }
}
