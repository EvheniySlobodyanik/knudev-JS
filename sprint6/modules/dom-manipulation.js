import { checkButtons } from "./validation.js";
import { checkInput } from "./validation.js";
import { checkPresidentSection } from "./validation.js";
import { checkQuizAnimation } from "./validation.js";

const rounds = [
  {
    question:
      "In which video game series do players explore the land of Hyrule?",
    answers: [
      { text: "Final Fantasy", correct: false },
      { text: "The Legend of Zelda", correct: true },
      { text: "Dragon Quest", correct: false },
      { text: "Pokemon", correct: false },
    ],
  },
  {
    question:
      "What classic board game involves buying and trading properties like Boardwalk and Park Place?",
    answers: [
      { text: "Scrabble", correct: false },
      { text: "Clue", correct: false },
      { text: "Risk", correct: false },
      { text: "Monopoly", correct: true },
    ],
  },
  {
    question:
      "In the game 'Minecraft', what material is required to craft a Nether Portal?",
    answers: [
      { text: "Obsidian", correct: true },
      { text: "Diamond", correct: false },
      { text: "Iron", correct: false },
      { text: "Gold", correct: false },
    ],
  },
  {
    question:
      "Which card game, popular in casinos, is also known as 'Twenty-One'?",
    answers: [
      { text: "Black Jack", correct: false },
      { text: "Poker", correct: true },
      { text: "Bridge", correct: false },
      { text: "Rummy", correct: false },
    ],
  },
  {
    question:
      "In the game 'Super Mario Bros', what is the name of Mario’s brother?",
    answers: [
      { text: "Bowser", correct: false },
      { text: "Toad", correct: false },
      { text: "Wario", correct: false },
      { text: "Luigi", correct: true },
    ],
  },
];

const buttons = [
  { button: document.getElementById("answer1"), text: "" },
  { button: document.getElementById("answer2"), text: "" },
  { button: document.getElementById("answer3"), text: "" },
  { button: document.getElementById("answer4"), text: "" },
];

const images = [
  {
    src: "huryle",
    alt: "A vast, mythical kingdom with rolling green fields, towering mountains, and ancient ruins, home to legendary warriors and magical creatures.",
  },
  {
    src: "board-game",
    alt: "A tabletop scene featuring colorful game pieces, dice, and a board with pathways leading to victory, where players strategize and compete.",
  },
  {
    src: "minecraft",
    alt: "A blocky, pixelated landscape featuring a player-built house and roaming animals.",
  },
  {
    src: "twenty-one",
    alt: "A deck of cards on a table with chips stacked beside them, ready for a hand.",
  },
  {
    src: "mario",
    alt: "A cheerful mustached character in a red hat jumps over platforms in a bright world.",
  },
];

let timeLeft = 30;
let timer;

const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");

const quizSection = document.getElementById("quiz-section");
const quizForm = document.getElementById("quiz-form");
const quizContainer = document.getElementById("quiz");
const overallContainer = document.getElementById("container-counter");

const displayedImage = document.getElementById("displayed-image");

const roundsPara = document.getElementById("rounds");
const scorePara = document.getElementById("score");

let roundCount = 0;
let scoreCount = 0;

const inputSection = document.getElementById("input-section");
const checkInp = document.getElementById("check-input");
const checkBtn = document.getElementById("check-button");

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("Time's up!");

      roundCount++;

      if (roundCount === 5) {
        endGame();
      }

      manageQuizContainment();
      showCurrentRound();
      resetTimer();
    }
  }, 1000);
}

function updateTimer(time) {
  document.getElementById("timer").textContent = `Time left: ${time}s`;
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

export function stopTimer() {
  clearInterval(timer);
}

function getCurrentRound() {
  return rounds[roundCount];
}

function getCurrentImage() {
  return images[roundCount];
}

function updateQuestion(question) {
  document.getElementById("question").textContent = question;
}

function updateAnswers(answers) {
  answers.forEach((answer, index) => {
    buttons[index].button.textContent = answer.text;
    buttons[index].button.dataset.correct = answer.correct;
  });
}

function updateImage(src, alt) {
  displayedImage.src = `images/section-quiz/${src}.jpg`;
  displayedImage.alt = alt;
}

function manageQuizContainment() {
  const currentRound = getCurrentRound();
  const currentImage = getCurrentImage();

  updateQuestion(currentRound.question);
  updateAnswers(currentRound.answers);
  updateImage(currentImage.src, currentImage.alt);
}

function clearStylesButtons() {
  buttons.forEach((btnObj) => {
    btnObj.button.disabled = false;
    document.getElementById("next").disabled = true;

    btnObj.button.classList.remove("correct");
    btnObj.button.classList.remove("incorrect");
  });
}

function handleStartOfQuiz() {
  startBtn.style.display = "none";
  nextBtn.style.display = "block";

  quizSection.classList.add("quiz-round");

  quizContainer.style.display = "inline-flex";

  roundsPara.style.display = "block";
  scorePara.style.display = "block";
}

function showCurrentRound() {
  roundsPara.textContent = `Round ${roundCount + 1}/5`;
}

export function updateScore() {
  scoreCount++;
  scorePara.textContent = `Your score: ${scoreCount}`;
}

export function startNextRound(checkNext) {
  nextBtn.classList.remove("pulsing");
  checkQuizAnimation("quiz-round");

  if (checkNext) {
    roundCount++;

    if (roundCount === 5) {
      endGame();
    }

    manageQuizContainment();
    clearStylesButtons();
    showCurrentRound();
    resetTimer();
  }
}

function animationAtTheEnd(removedOne, addedOne) {
  const quizAnimation = document.querySelector(`.${removedOne}`);
  quizAnimation.classList.remove(`${removedOne}`);

  quizAnimation.classList.add(`${addedOne}`);
}

function addEndGameMessages(endMessage, endScore) {
  animationAtTheEnd("quiz-round", "whirlpool");

  const container = document.createElement("div");
  container.classList.add("container-end");

  const paraEndMessage = document.createElement("p");
  const paraEndScore = document.createElement("p");

  paraEndMessage.textContent = `${endMessage}`;
  paraEndMessage.classList.add("para-end-message");

  paraEndScore.textContent = `${endScore} ${scoreCount}`;
  paraEndScore.classList.add("para-end-score");

  container.appendChild(paraEndMessage);
  container.appendChild(paraEndScore);

  quizSection.appendChild(container);
}

function endGame() {
  quizForm.style.display = "none";
  overallContainer.style.display = "none";

  addEndGameMessages("You have completed the quiz!", "Your end score:");
}

export function handleQuiz() {
  handleStartOfQuiz();
  startTimer();
  manageQuizContainment();
  showCurrentRound();
  checkButtons(buttons);
}

function createImage(src, alt) {
  checkPresidentSection("portrait", "zelensky-portrait");

  const img = document.createElement("img");

  img.src = src;
  img.alt = alt;

  img.classList.add("zelensky-portrait");
  img.classList.add("burning-image");

  inputSection.appendChild(img);
}

function createMessage(message) {
  checkPresidentSection("", "president-message");

  const msg = document.createElement("p");
  msg.textContent = message;
  msg.classList.add("president-message");
  inputSection.appendChild(msg);
}

export function handleInput() {
  let result = checkInput(checkInp);

  if (result) {
    checkInp.value = "";
    checkInp.disabled = true;
    checkInp.style.cursor = "no-drop";
    checkBtn.disabled = true;

    createImage(
      "images/section-input/zelensky.jpg",
      "A determined and resolute leader standing with confidence. His sharp gaze and strong posture reflect unwavering resilience and dedication. A symbol of courage and leadership in challenging times."
    );
  } else {
    createMessage(
      "Incorrect! Your social respect points are decreased by 500!"
    );
  }
}
