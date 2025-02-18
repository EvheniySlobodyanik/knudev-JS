let askName;

let mysteryNumber = getNumber();
console.log(mysteryNumber);

const para = document.getElementById("number-guess-paragraph");
const resetPara = document.getElementById("number-guess-paragraph-reset");

const guessBtn = document.getElementById("number-guess-button");
const guessInput = document.getElementById("number-guess-input");

let maxAttempts = 10;
let guessCount = 0;
const countPara = document.getElementById("number-guess-counter");

const nextBtn = document.getElementById("number-guess-next");
const difficulty = document.getElementById("number-guess-difficulty");

const resetBtn = document.getElementById("number-guess-reset");

let guesses = [];

let timerInterval;

let totalPoints = 0;
let totalTries = 0;
let totalResets = 0;
let totalRounds = 0;

const paraTime = document.getElementById("number-guess-timer");

const namePlaceholder = document.getElementById("ask-name-place");

let tableSeconds = document.getElementById("table-seconds");
let tableAttempts = document.getElementById("table-attempts");
let tableGuesses = document.getElementById("table-guesses");
let tableMystery = document.getElementById("table-mystery");

startTimer();

function getName() {
  try {
    askName = prompt(
      "Enter the name that will be displayed in the leaderboard:"
    );
    while (askName === "" || askName === null) {
      askName = prompt(
        "Enter the name that will be displayed in the leaderboard:"
      );
    }
    changeTextContext(namePlaceholder, `Look at your results, ${askName}!`);
  } catch (error) {
    console.error("Error occurred while entering name: ", error);
    alert(error.message);
  }
}

function getNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function changeTextContext(element, text = "") {
  element.textContent = `${text}`;
}

function setColors(element, backgroundColor, color) {
  element.style.backgroundColor = backgroundColor;
  element.style.color = color;
}

function getValue(element) {
  return Number(document.getElementById(element).value);
}

function resetValue(element) {
  document.getElementById(element).value = "";
}

function setDisplay(element, display) {
  element.style.display = display;
}

function setCursor(element, value) {
  element.style.cursor = value;
}

function switchDisability(element, value) {
  element.disabled = value;
}

function startTimer() {
  let sec = 0;
  let minutes = 0;
  timerInterval = setInterval(function () {
    try {
      minutes = Math.floor(sec / 60);
      let displaySec = sec % 60 < 10 ? `0${sec % 60}` : sec % 60;
      let displayMin = minutes < 10 ? `0${minutes}` : minutes;

      paraTime.innerHTML = `${displayMin}:${displaySec}`;

      sec++;
    } catch (error) {
      console.error("Error in timer function: ", error);
      alert(error.message);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  changeTextContext(paraTime);
}

function startDifficulty() {
  difficulty.textContent = "Easy";
}

function setDifficulty() {
  const difficulties = ["Easy", "Normal", "Hard", "Extreme", "Nightmare", "?"];
  const difficultyNow = difficulty.textContent.trim();
  const indexNow = difficulties.indexOf(difficultyNow);

  difficulty.textContent = difficulties[indexNow + 1];
  handleDifficulty();
}

function handleDifficulty() {
  if (difficulty.textContent === "?") {
    changeTextContext(
      para,
      "Congratulations! You passed all difficulties of guess game!"
    );
    switchDisability(nextBtn, true);
    setCursor(nextBtn, "no-drop");
    setCursor(guessBtn, "no-drop");
    setCursor(guessInput, "no-drop");
  } else if (maxAttempts > 1) {
    maxAttempts--;
  }
}

guessBtn.addEventListener("click", () => {
  try {
    if (guessCount < maxAttempts) {
      guessCount++;

      changeTextContext(
        countPara,
        `Attempts left: ${maxAttempts - guessCount}`
      );
      setColors(countPara, "#a5d6a7", "#2e7d32");

      guessGame();
    } else {
      switchDisability(guessBtn, true);
      switchDisability(guessInput, true);
      changeTextContext(countPara, "You are out of attempts!");
      changeTextContext(para);
      setColors(countPara, "#ef9a9a", "#c62828");

      resetGame();
    }
  } catch (error) {
    console.error(
      "Error occurred while working with guessCount variable: ",
      error
    );
    alert(error.message);
  }
});

resetBtn.addEventListener("click", () => {
  setColors(countPara, "#a5d6a7", "#2e7d32");
  switchDisability(guessBtn, false);
  switchDisability(guessInput, false);
  nullPerformanceStatistics();

  guesses = [];
  maxAttempts = 10;
  totalResets++;

  stopTimer();
  scoreBoard();
});

resetBtn.addEventListener("click", startDifficulty);

nextBtn.addEventListener("click", () => {
  setColors(countPara, "#a5d6a7", "#2e7d32");
  switchDisability(guessBtn, false);
  switchDisability(guessInput, false);
  nullPerformanceStatistics();

  guesses = [];
  totalRounds++;

  scoreBoard();
});

function guessGame() {
  const inputValue = getValue("number-guess-input");

  changeTextContext(
    countPara,
    `Your attempts left: ${maxAttempts - guessCount}`
  );

  guesses.push(inputValue);

  guessGameCheck(inputValue);

  totalTries++;
  scoreBoard();
}

function guessGameCheck(inputValue) {
  try {
    if (inputValue < 1 || inputValue > 100) {
      para.textContent = "Your guess must be in range from 1 to 100!";
      para.style.color = "#c62828";
      para.style.backgroundColor = "#ef9a9a";
    } else if (inputValue === mysteryNumber) {
      totalPoints++;
      para.textContent = "Congratulations! U guessed the number correctly!";
      para.style.color = "#2e7d32";
      para.style.backgroundColor = "#a5d6a7";
      guessBtn.disabled = true;
      guessInput.disabled = true;
      performanceStatistics();
      resetGame();
      nextRound();
    } else if (inputValue < mysteryNumber) {
      para.textContent = "Your guess is too low! Try higher!";
      para.style.color = "#c62828";
      para.style.backgroundColor = "#ef9a9a";
    } else if (inputValue > mysteryNumber) {
      para.textContent = "Your guess is too high! Try lower!";
      para.style.color = "#c62828";
      para.style.backgroundColor = "#ef9a9a";
    }
  } catch (error) {
    console.error("An error occurred while value processed: ", error);
    alert(error.message);
  }
}

function resetGame() {
  stopTimer();
  changeTextContext(
    resetPara,
    "Press button below to start new(reset) or next round"
  );
  resetValue("number-guess-input");
  setDisplay(resetBtn, "block");

  guessCount = 0;

  resetBtn.removeEventListener("click", endGame);
  resetBtn.addEventListener("click", endGame, { once: true });
}

function nextRound() {
  guessCount = 0;

  setDisplay(nextBtn, "block");
  setDifficulty();
  changeTextContext(countPara, `Your attempts left: ${maxAttempts}`);
  stopTimer();
  startTimer();

  nextBtn.removeEventListener("click", endGame);
  nextBtn.addEventListener("click", endGame, { once: true });
}

function endGame() {
  setDisplay(resetBtn, "none");
  setDisplay(nextBtn, "none");
  changeTextContext(resetPara);
  changeTextContext(para);
  changeTextContext(countPara, `Your attempts left: ${maxAttempts}`);
  resetValue(
    "number-guess-input",
    `Your attempts: ${maxAttempts - guessCount}`
  );

  document.getElementById("number-guess-input").focus();

  mysteryNumber = getNumber();
  console.log(mysteryNumber);

  stopTimer();
  startTimer();
}

function performanceStatistics() {
  changeTextContext(tableSeconds, `${paraTime.textContent}`);
  changeTextContext(tableAttempts, `${guessCount}`);
  tableGuesses.textContent = guesses.join(", ");
  changeTextContext(tableMystery, `${mysteryNumber}`);

  scoreBoard();
}

function nullPerformanceStatistics() {
  changeTextContext(tableSeconds);
  changeTextContext(tableAttempts);
  changeTextContext(tableGuesses);
  changeTextContext(tableMystery);
}

function scoreBoard() {
  document.getElementById("total-points").textContent = totalPoints;
  document.getElementById("total-tries").textContent = totalTries;
  document.getElementById("total-resets").textContent = totalResets;
  document.getElementById("total-rounds").textContent = totalRounds;
}
