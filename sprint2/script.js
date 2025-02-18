// Utility functions: getName(), getNumber(), changeTextContext(), setColors(), getValue(), resetValue(), setDisplay(),
// set cursor(), switchDisability();

//Timer functions: startTimer(), stopTimer();

//Game initialization and setup functions: startDifficulty(), setDifficulty(), handleDifficulty()

//Event listeners: guessBtn.addEventListener(...), resetBtn.addEventListener(...), nextBtn.addEventListener(...)

//Game flow functions: guessGame(), guessGameCheck(), resetGame(), nextRound(), endGame()

//Statistics and performance functions: performanceStatistics(), nullPerformanceStatistics(), scoreBoard()

//variable for user prompt, used in performance statistics paragraph
let askName;

//our computer guess
let mysteryNumber = getNumber();
console.log(mysteryNumber);

//variables that change their textContext through code often
const para = document.getElementById("number-guess-paragraph");
const resetPara = document.getElementById("number-guess-paragraph-reset");

//two main variables that get elements from html: button "Guess" and input where we put our guess
const guessBtn = document.getElementById("number-guess-button");
const guessInput = document.getElementById("number-guess-input");

//main variables that interact with user attempts, countPara textContext represent (maxAttempts - guessCount)
let maxAttempts = 10;
let guessCount = 0;
const countPara = document.getElementById("number-guess-counter");

//main variables that interact with difficulty, click on nextBtn and difficulty will change
const nextBtn = document.getElementById("number-guess-next");
const difficulty = document.getElementById("number-guess-difficulty");

//variable that resets performance table(second section), difficulty and maxTries
const resetBtn = document.getElementById("number-guess-reset");

//array for performance table that contains all user guesses from current round
let guesses = [];

//timer itself in program
let timerInterval;

//variables for scoreBoard(), they grow higher in some functions and then updates at scoreBoard()
let totalPoints = 0;
let totalTries = 0;
let totalResets = 0;
let totalRounds = 0;

//timer itself on screen
const paraTime = document.getElementById("number-guess-timer");

//placeholder for askName
const namePlaceholder = document.getElementById("ask-name-place");

//variables for scoreBoard with which u can place in cell totalPoints, totalTries, totalResets and totalRounds
let tableSeconds = document.getElementById("table-seconds");
let tableAttempts = document.getElementById("table-attempts");
let tableGuesses = document.getElementById("table-guesses");
let tableMystery = document.getElementById("table-mystery");

startTimer();

//prompts for user name till we get one and then places it in namePlaceholder
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

//gets random number between 1 and 100 using math functions
function getNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//changes screen displayed text of element
function changeTextContext(element, text = "") {
  element.textContent = `${text}`;
}

//changes screen displayed backgroundColor and color of element
function setColors(element, backgroundColor, color) {
  element.style.backgroundColor = backgroundColor;
  element.style.color = color;
}

//gets value from element in string format and then converts it to number format
function getValue(element) {
  return Number(document.getElementById(element).value);
}

//resets value to empty string
function resetValue(element) {
  document.getElementById(element).value = "";
}

//changes element display on screen
function setDisplay(element, display) {
  element.style.display = display;
}

//changes what type of cursor user will have when he hovers on element
function setCursor(element, value) {
  element.style.cursor = value;
}

//determines whether the user can interact with the element
function switchDisability(element, value) {
  element.disabled = value;
}

//starts timer and displays it on the screen
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

//stops timer on screen
function stopTimer() {
  clearInterval(timerInterval);
  changeTextContext(paraTime);
}

//changes difficulty to easy(start) if user interacts with reset button
function startDifficulty() {
  difficulty.textContent = "Easy";
}

//sets difficulty if user interacts with next round button
function setDifficulty() {
  const difficulties = ["Easy", "Normal", "Hard", "Extreme", "Nightmare", "?"];
  const difficultyNow = difficulty.textContent.trim();
  const indexNow = difficulties.indexOf(difficultyNow);

  difficulty.textContent = difficulties[indexNow + 1];
  handleDifficulty();
}

//handles situation when user beats all existing difficulties
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

//when user clicks on guess button we get here to invoke some utility functions based on ui appearance,
//or leads to resetGame() function based on left attempts
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

//when user clicks on reset button we invoke utility functions based on ui appearance,
//reset user guesses array, attempts and add totalResets point to scoreBoard, then we stop timer and update scoreboard
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

//when user clicks on reset button we reset difficulty to "Easy"(start)
resetBtn.addEventListener("click", startDifficulty);

//when user clicks on next round button we invoke functions based on ui appearance,
//reset performance table, user guesses array, add totalRounds point to scoreBoard and update scoreBoard
nextBtn.addEventListener("click", () => {
  setColors(countPara, "#a5d6a7", "#2e7d32");
  switchDisability(guessBtn, false);
  switchDisability(guessInput, false);
  nullPerformanceStatistics();

  guesses = [];
  totalRounds++;

  scoreBoard();
});

//main function of guess game, interacts with user guesses array, invokes function that check user guess,
//add totalTries point to scoreBoard and update scoreBoard
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

//checks user guess: if it out of range, lower than mysteryNumber or higher
//if user guesses number we change ui appearance
function guessGameCheck(inputValue) {
  try {
    if (inputValue < 1 || inputValue > 100) {
      changeTextContext(para, "Your guess must be in range from 1 to 100!");
      setColors(para, "#ef9a9a", "#c62828");
    } else if (inputValue === mysteryNumber) {
      totalPoints++;

      changeTextContext(
        para,
        "Congratulations! U guessed the number correctly!"
      );
      setColors(para, "#a5d6a7", "#2e7d32");
      switchDisability(guessBtn, true);
      switchDisability(guessInput, true);

      performanceStatistics();

      resetGame();
      nextRound();
    } else if (inputValue < mysteryNumber) {
      changeTextContext(para, "Your guess is too low! Try higher!");
      setColors(para, "#ef9a9a", "#c62828");
    } else if (inputValue > mysteryNumber) {
      changeTextContext(para, "Your guess is too high! Try lower!");
      setColors(para, "#ef9a9a", "#c62828");
    }
  } catch (error) {
    console.error("An error occurred while value processed: ", error);
    alert(error.message);
  }
}

//stops timer, resets value of input + user guess count(tries), hides reset button,
//helps user with text and invokes endGame() function
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

//resets user tries, changes difficulty, stops and starts new timer, change max user tries for round
//invokes endGame() function
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

//hides reset and next round button, hides some paragraphs, shows user left attempts, resets input value
//gives user focus to input, generates new mysteryNumber, stops and start new timer
function endGame() {
  setDisplay(resetBtn, "none");
  setDisplay(nextBtn, "none");
  changeTextContext(resetPara);
  changeTextContext(para);
  changeTextContext(countPara, `Your attempts left: ${maxAttempts}`);
  resetValue("number-guess-input");

  document.getElementById("number-guess-input").focus();

  mysteryNumber = getNumber();
  console.log(mysteryNumber);

  stopTimer();
  startTimer();
}

//change user performance statistics after successful completed round
function performanceStatistics() {
  changeTextContext(tableSeconds, `${paraTime.textContent}`);
  changeTextContext(tableAttempts, `${guessCount}`);
  tableGuesses.textContent = guesses.join(", ");
  changeTextContext(tableMystery, `${mysteryNumber}`);

  scoreBoard();
}

//resets user performance statistics after start of new round or reset
function nullPerformanceStatistics() {
  changeTextContext(tableSeconds);
  changeTextContext(tableAttempts);
  changeTextContext(tableGuesses);
  changeTextContext(tableMystery);
}

//shows user score points after reset, completing round, spent attempt, guessing mysteryNumber
function scoreBoard() {
  document.getElementById("total-points").textContent = totalPoints;
  document.getElementById("total-tries").textContent = totalTries;
  document.getElementById("total-resets").textContent = totalResets;
  document.getElementById("total-rounds").textContent = totalRounds;
}
