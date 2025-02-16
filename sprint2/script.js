function getNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const para = document.getElementById("number-guess-paragraph");

function guessGame() {
  const inputValue = Number(
    document.getElementById("number-guess-input").value
  );

  countPara.textContent = `Your attempts left: ${10 - guessCount}`;

  try {
    if (inputValue < 1 || inputValue > 100) {
      para.textContent = "Your guess must be in range from 1 to 100!";
      para.style.color = "#c62828";
      para.style.backgroundColor = "#ef9a9a";
    } else if (inputValue === mysteryNumber) {
      para.textContent = "Congratulations! U guessed the number correctly!";
      para.style.color = "#2e7d32";
      para.style.backgroundColor = "#a5d6a7";
      resetGame();
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

const mysteryNumber = getNumber();
console.log(mysteryNumber);

let guessCount = 0;
const countPara = document.getElementById("number-guess-counter");

document.getElementById("number-guess-button").addEventListener("click", () => {
  try {
    if (guessCount < 10) {
      guessGame();
      countPara.textContent = `Attempts left: ${10 - guessCount}`;
      countPara.style.color = "#2e7d32";
      countPara.style.backgroundColor = "#a5d6a7";
      guessCount++;
    } else {
      countPara.textContent = "You are out of attempts!";
      countPara.style.color = "#c62828";
      countPara.style.backgroundColor = "#ef9a9a";
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

const resetBtn = document.getElementById("number-guess-reset");

function resetGame() {
  countPara.textContent = "";
  para.textContent = "Press button below to start new round";
  document.getElementById("number-guess-button").disabled = true;
  document.getElementById("number-guess-input").disabled = true;
  document.getElementById("number-guess-input").value = "";
  resetBtn.style.display = "block";
  resetBtn.addEventListener("click", endGame);
}

function endGame() {
  resetBtn.style.display = "none";
  para.textContent = "";
  document.getElementById("number-guess-button").disabled = false;
  document.getElementById("number-guess-input").disabled = false;
  document.getElementById("number-guess-input").value = "";
  document.getElementById("number-guess-input").focus();
  guessCount = 0;
}
