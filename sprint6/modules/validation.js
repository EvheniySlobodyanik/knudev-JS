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

export function checkInput(checkInp) {
  return checkInp.value.trim().toLowerCase() === "zelensky";
}

function checkForImage(checkingImage) {
  //row below can be upgraded
  checkForMessage("president-message");

  const existingImg = document.querySelector(`.${checkingImage}`);
  if (existingImg) {
    existingImg.remove();
  }
}

function checkForMessage(checkingMessage) {
  const existingMsg = document.querySelector(`.${checkingMessage}`);
  if (existingMsg) {
    existingMsg.remove();
  }
}

export function checkPresidentSection(containment, checking) {
  containment === "portrait"
    ? checkForImage(checking)
    : checkForMessage(checking);
}

export function checkQuizAnimation(checkingAnimation) {
  const quizAnimation = document.querySelector(`.${checkingAnimation}`);

  if (quizAnimation) {
    quizAnimation.classList.remove(`${checkingAnimation}`);

    void quizAnimation.offsetWidth;

    quizAnimation.classList.add(`${checkingAnimation}`);
  }
}
