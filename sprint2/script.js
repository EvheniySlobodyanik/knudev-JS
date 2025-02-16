function getNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function guessGame() {
  const inputValue = Number(
    document.getElementById("number-guess-input").value
  );
  const para = document.getElementById("number-guess-paragraph");

  countPara.textContent = `Your attempts left: ${10 - guessCount}`;

  if (inputValue < 1 || inputValue > 100) {
    para.textContent = "Your guess must be in range from 1 to 100!";
    para.style.color = "#c62828";
    para.style.backgroundColor = "#ef9a9a";
  } else if (inputValue === mysteryNumber) {
    para.textContent = "Congratulations! U guessed the number correctly!";
    para.style.color = "#2e7d32";
    para.style.backgroundColor = "#a5d6a7";
  } else if (inputValue < mysteryNumber) {
    para.textContent = "too low!";
    para.style.color = "#c62828";
    para.style.backgroundColor = "#ef9a9a";
  } else if (inputValue > mysteryNumber) {
    para.textContent = "too high!";
    para.style.color = "#c62828";
    para.style.backgroundColor = "#ef9a9a";
  }
}

const mysteryNumber = getNumber();
console.log(mysteryNumber);

let guessCount = 0;
const countPara = document.getElementById("number-guess-counter");

document.getElementById("number-guess-button").addEventListener("click", () => {
  if (guessCount < 10) {
    guessGame();
    countPara.textContent = `Attempts left: ${10 - guessCount}`;
    countPara.style.color = "#2e7d32";
    countPara.style.backgroundColor = "#a5d6a7";
    guessCount++;
  } else {
    countPara.textContent = "Out of attempts!";
    countPara.style.color = "#c62828";
    countPara.style.backgroundColor = "#ef9a9a";
  }
});
