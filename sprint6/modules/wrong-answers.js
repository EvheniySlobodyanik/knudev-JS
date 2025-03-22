import { getCurrentRound } from "./dom-manipulation.js";
import { addMessages } from "./dom-manipulation.js";

let wrongAnswers = [];
let questions = [];

export function catchWrongAnswer(buttons) {
  buttons.forEach((btnObj) => {
    btnObj.button.addEventListener("click", () => {
      if (btnObj.button.dataset.correct !== "true") {
        wrongAnswers.push(btnObj.button.textContent);
      }
    });
  });
  catchQuestionForWrongAnswer(buttons);
}

function catchQuestionForWrongAnswer(buttons) {
  buttons.forEach((btnObj) => {
    btnObj.button.addEventListener("click", (event) => {
      const isCorrect = event.target.dataset.correct === "true";

      if (!isCorrect) {
        questions.push(getCurrentRound().question);
      }
    });
  });
}

export function handleWrongAnswers() {
  document.getElementById("wrong").style.display = "none";

  wrongAnswers.forEach((wrong, index) => {
    const question = questions[index];

    addMessages(
      `Question: ${question}`,
      `Your answer: ${wrong}`,
      document.getElementById("section-wrong-answers")
    );
  });
}
