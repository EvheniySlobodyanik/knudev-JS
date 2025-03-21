import { stopTimer } from "./dom-manipulation.js";

export function checkButtons(buttons) {
  buttons.forEach((btnObj) => {
    btnObj.button.addEventListener("click", (event) => {
      checkAnswers(event, buttons);
      stopTimer();
    });
  });
}

function checkAnswers(event, buttons) {
  buttons.forEach((btnObj) => {
    const isCorrect = btnObj.button.dataset.correct === "true";
    btnObj.button.style.backgroundColor = isCorrect ? "green" : "red";
    btnObj.button.disabled = true;
    document.getElementById("next").disabled = false;
  });
}
