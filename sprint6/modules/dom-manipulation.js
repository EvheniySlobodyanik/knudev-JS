import { checkButtons } from "./quiz-check.js";

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
    src: "zelda",
    alt: "A heroic warrior in a green tunic explores a vast, magical land with a sword and shield.",
  },
  {
    src: "monopoly",
    alt: "A colorful board game with properties, houses, and a banker managing play money.",
  },
  {
    src: "minecraft",
    alt: "A blocky, pixelated landscape featuring a player-built house and roaming animals.",
  },
  {
    src: "poker",
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
const quizContainer = document.getElementById("quiz");
const roundsPara = document.getElementById("rounds");

let roundCount = 0;

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

function updateQuestion(question) {
  document.getElementById("question").textContent = question;
}

function updateAnswers(answers) {
  answers.forEach((answer, index) => {
    buttons[index].button.textContent = answer.text;
    buttons[index].button.dataset.correct = answer.correct;
  });
}

function manageQuizContainment() {
  const currentRound = getCurrentRound();
  updateQuestion(currentRound.question);
  updateAnswers(currentRound.answers);
}

function handleStartOfQuiz() {
  startBtn.style.display = "none";
  nextBtn.style.display = "block";
  quizContainer.style.display = "inline-flex";
  roundsPara.style.display = "flex";
}

function showCurrentRound() {
  roundsPara.textContent = `Round ${roundCount + 1}/5`;
}

export function startNextRound(checkNext) {
  if (checkNext) {
    roundCount++;
    manageQuizContainment();
    showCurrentRound();
    resetTimer();
  }
}

export function handleQuiz() {
  handleStartOfQuiz();
  startTimer();
  manageQuizContainment();
  showCurrentRound();
  checkButtons(buttons);
}
