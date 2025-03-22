import { stopTimer } from "./dom-manipulation.js";
import { updateScore } from "./dom-manipulation.js";

export function checkButtons(buttons) {
  buttons.forEach((btnObj) => {
    btnObj.button.addEventListener("click", (event) => {
      checkAnswers(event, buttons);
      stopTimer();

      if (btnObj.button.dataset.correct === "true") {
        updateScore();
      }
    });
  });
}

function checkAnswers(event, buttons) {
  buttons.forEach((btnObj) => {
    const isCorrect = btnObj.button.dataset.correct === "true";

    btnObj.button.classList.add(isCorrect ? "correct" : "incorrect");
    btnObj.button.disabled = true;

    document.getElementById("next").disabled = false;
    document.getElementById("next").classList.add("pulsing");
  });
}
