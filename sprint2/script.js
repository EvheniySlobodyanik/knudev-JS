let askName;

let mysteryNumber = getNumber();
console.log(mysteryNumber);

const para = document.getElementById("number-guess-paragraph");
const resetPara = document.getElementById("number-guess-paragraph-reset");

let maxAttempts = 10;
let guessCount = 0;
const countPara = document.getElementById("number-guess-counter");

const nextBtn = document.getElementById("number-guess-next");
const difficulty = document.getElementById("number-guess-difficulty");

const resetBtn = document.getElementById("number-guess-reset");

let guesses = [];

let timerInterval;
let sec = 0;

let totalPoints = 0;
let totalTries = 0;
let totalResets = 0;
let totalRounds = 0;

startTimer();

try {
  askName = prompt("Enter the name that will be displayed in the leaderboard:");
  while (askName === "" || askName === null) {
    askName = prompt(
      "Enter the name that will be displayed in the leaderboard:"
    );
  }
} catch (error) {
  console.error("Error occurred while entering name: ", error);
  alert(error.message);
}

function getNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function startTimer() {
  sec = 0;
  timerInterval = setInterval(function () {
    try {
      if (sec < 10) {
        document.getElementById("number-guess-timer").innerHTML = "00:0" + sec;
      } else if (sec >= 10) {
        document.getElementById("number-guess-timer").innerHTML = "00:" + sec;
      }
      sec++;
    } catch (error) {
      console.error("Error in timer function: ", error);
      alert(error.message);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("number-guess-timer").textContent = "";
}

resetBtn.addEventListener("click", () => {
  totalResets++;
  stopTimer();
  scoreBoard();
});

nextBtn.addEventListener("click", () => {
  totalRounds++;
  scoreBoard();
});

function guessGame() {
  const inputValue = Number(
    document.getElementById("number-guess-input").value
  );
  countPara.textContent = `Your attempts left: ${maxAttempts - guessCount}`;

  guesses.push(inputValue);

  totalTries++;

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

  scoreBoard();
}

function startDifficulty() {
  difficulty.textContent = "Easy";
}

document.getElementById("number-guess-button").addEventListener("click", () => {
  try {
    if (guessCount < 10) {
      guessCount++;
      countPara.textContent = `Attempts left: ${maxAttempts - guessCount}`;
      guessGame();
    } else {
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

resetBtn.addEventListener("click", startDifficulty);

function resetGame() {
  stopTimer();
  resetPara.textContent =
    "Press button below to start new(reset) or next round";
  document.getElementById("number-guess-input").value = "";
  resetBtn.style.display = "block";

  guessCount = 0;

  resetBtn.removeEventListener("click", endGame);
  resetBtn.addEventListener("click", endGame, { once: true });
}

function endGame() {
  resetBtn.style.display = "none";
  nextBtn.style.display = "none";
  resetPara.textContent = "";
  para.textContent = "";
  document.getElementById("number-guess-input").value = "";
  document.getElementById("number-guess-input").focus();
  countPara.textContent = `Your attempts: ${maxAttempts - guessCount}`;

  mysteryNumber = getNumber();
  console.log(mysteryNumber);

  stopTimer();
  startTimer();
}

function nextRound() {
  nextBtn.style.display = "block";

  const difficulties = ["Easy", "Normal", "Hard", "Extreme", "Nightmare", "?"];
  const difficultyNow = difficulty.textContent.trim();
  const indexNow = difficulties.indexOf(difficultyNow);
  console.log(difficulties[indexNow + 1]);

  if (difficulty.textContent === "?") {
    para.textContent =
      "Congratulations! You passed all difficulties of guess game!";
    nextBtn.disabled = true;
    nextBtn.style.cursor = "no-drop";
    document.getElementById("number-guess-button").style.cursor = "no-drop";
    document.getElementById("number-guess-input").style.cursor = "no-drop";
  }

  if (maxAttempts > 1) {
    maxAttempts--;
  }

  difficulty.textContent = difficulties[indexNow + 1];
  guessCount = 0;

  countPara.textContent = `Your attempts left: ${maxAttempts}`;

  stopTimer();
  startTimer();

  nextBtn.removeEventListener("click", endGame);
  nextBtn.addEventListener("click", endGame, { once: true });
}

function performanceStatistics() {
  document.getElementById("table-seconds").textContent =
    document.getElementById("number-guess-timer").textContent;
  document.getElementById("table-attempts").textContent = guessCount;
  document.getElementById("table-guesses").textContent = guesses.join(", ");
  document.getElementById("table-mystery").textContent = mysteryNumber;

  scoreBoard();
}

function scoreBoard() {
  document.getElementById("total-points").textContent = totalPoints;
  document.getElementById("total-tries").textContent = totalTries;
  document.getElementById("total-resets").textContent = totalResets;
  document.getElementById("total-rounds").textContent = totalRounds;
}
