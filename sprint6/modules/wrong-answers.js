import { getCurrentRound } from "./dom-manipulation.js";

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

function createContainer(firstText, secondText, block) {
  const container = document.createElement("div");
  container.classList.add("container-block");

  const title = document.createElement("h4");
  title.textContent = firstText;
  title.classList.add("container-title");

  const para = document.createElement("p");
  para.textContent = secondText;
  para.classList.add("container-para");

  container.appendChild(title);
  container.appendChild(para);

  block.appendChild(container);
}

export function handleWrongAnswers() {
  document.getElementById("wrong").style.display = "none";

  wrongAnswers.forEach((wrong, index) => {
    const question = questions[index];

    createContainer(
      `Question: ${question}`,
      `Your answer: ${wrong}`,
      document.getElementById("section-wrong-answers")
    );
  });
}
