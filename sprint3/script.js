import { Calculator } from "./modules/arithmetic-operations.js";

const zero = document.getElementById("button-zero");
const one = document.getElementById("button-one");
const two = document.getElementById("button-two");
const three = document.getElementById("button-three");
const four = document.getElementById("button-four");
const five = document.getElementById("button-five");
const six = document.getElementById("button-six");
const seven = document.getElementById("button-seven");
const eight = document.getElementById("button-eight");
const nine = document.getElementById("button-nine");

const numbers = [one, two, three, four, five, six, seven, eight, nine];

const divide = document.getElementById("button-divide");
const multiply = document.getElementById("button-multiply");
const minus = document.getElementById("button-minus");
const plus = document.getElementById("button-plus");
const remainder = document.getElementById("button-remainder");
const exponentiation = document.getElementById("button-exponentiation");

const operations = [
  { button: plus, symbol: "+" },
  { button: minus, symbol: "-" },
  { button: divide, symbol: "÷" },
  { button: multiply, symbol: "×" },
  { button: remainder, symbol: "%" },
];

const root = document.getElementById("button-root");
const oneDivX = document.getElementById("button-1-div-x");
const factorial = document.getElementById("button-factorial");

const equals = document.getElementById("button-equals");

const clear = document.getElementById("button-clear");
const deleteOneSymbol = document.getElementById("button-delete-1-symbol");

const calcInput = document.getElementById("calc-input");

const calcHistory = document.getElementById("calc-history");
const historySection = document.getElementById("history-section");
const containerHistory = document.getElementById("history-container");
const btnClearHistory = document.getElementById("button-clear-history");
let counter = 0;

const buttonArray = [];

const calc = new Calculator();

const sendMessage = function () {
  console.log("Arithmetic operations are chained together!");
};

sendMessage();

// console.log(
//   `Result of addition = ${calc.addition(15).addition(10).getResult()}`
// );

// console.log(`Result of subtraction = ${calc.subtraction(-5).getResult()}`);

// console.log(`Result of division = ${calc.division(10).getResult()}`);

// console.log(
//   `Result of multiplication = ${calc
//     .multiplication(100)
//     .multiplication(1000)
//     .getResult()}`
// );

// console.log(`Result of exponentiation = ${calc.exponentiation(2).getResult()}`);

// console.log(`Result of remainder = ${calc.remainder(100).getResult()}`);

addEventListener("load", () => calcInput.focus());

var f = [];

function calcFactorial(n) {
  try {
    if (n == 0 || n == 1) return 1;
    if (f[n] > 0) return f[n];
    return (f[n] = calcFactorial(n - 1) * n);
  } catch (error) {
    if (error instanceof RangeError) {
      console.error("Range Error Occurred: " + error.message);
    }
  }
}

getAccess();

function getAccess() {
  try {
    calcInput.addEventListener(
      "keypress",
      () => {
        calcInput.value = "";
      },
      { once: true }
    );

    calcHistory.addEventListener("click", () => {
      showHistory();

      if (historySection.style.display === "block" && counter === 2) {
        hideHistory();
      }
      counter++;
    });

    btnClearHistory.addEventListener("click", () => {
      deleteHistory();
    });

    deleteOneSymbol.addEventListener("click", () => {
      calcInput.value = calcInput.value.slice(0, -1);
    });

    clear.addEventListener("click", () => {
      calcInput.value = "0";
    });

    zero.addEventListener("click", () => {
      if (calcInput.value.startsWith("0")) {
        calcInput.value = calcInput.value.replace(/^0+/, "");
      }

      if (!(calcInput.value === "0")) {
        calcInput.value += zero.value;
      }
    });

    numbers.forEach((button) => {
      button.addEventListener("click", () => {
        if (calcInput.value === "0") calcInput.value = "";
        calcInput.value += button.value;
      });
    });

    operations.forEach(({ button, symbol }) => {
      button.addEventListener("click", () => {
        calcInput.value = calcInput.value.replace(/[-+÷×%]$/, "") + symbol;
      });
    });

    exponentiation.addEventListener("click", () => {
      if (
        !(
          calcInput.value === "+" ||
          calcInput.value === "-" ||
          calcInput.value === "÷" ||
          calcInput.value === "×" ||
          calcInput.value === "%"
        )
      ) {
        const calculator = new Calculator(Number(calcInput.value));
        const number1 = Number(calcInput.value);
        calcInput.value = calculator.exponentiation(2).getResult();
        runningHistory(number1, 2, "**", calculator.getResult());
      }
    });

    root.addEventListener("click", () => {
      if (
        !(
          calcInput.value === "+" ||
          calcInput.value === "-" ||
          calcInput.value === "÷" ||
          calcInput.value === "×" ||
          calcInput.value === "%"
        )
      ) {
        calcInput.value = Number(Math.sqrt(calcInput.value));
      }
    });

    oneDivX.addEventListener("click", () => {
      if (
        !(
          calcInput.value === "+" ||
          calcInput.value === "-" ||
          calcInput.value === "÷" ||
          calcInput.value === "×" ||
          calcInput.value === "%"
        )
      ) {
        calcInput.value = Number(1 / calcInput.value);
      }
    });

    factorial.addEventListener("click", () => {
      if (/^[0-9]+$/.test(calcInput.value)) {
        calcInput.value = calcFactorial(Number(calcInput.value));
      }
    });
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference Error Occurred: " + error.message);
    } else if (error instanceof SyntaxError) {
      console.error("Syntax Error Occurred: " + error.message);
    } else if (error instanceof TypeError) {
      console.error("Type Error Occurred: " + error.message);
    }
  }

  equals.addEventListener("click", () => calculating());
}

function calculating() {
  const numberArray = calcInput.value.match(/(\d+)/g);
  const operatorsArray = calcInput.value.match(/(\D)/g);

  let calculator = new Calculator(Number(numberArray[0]));

  let number2;
  let operator;

  try {
    for (let i = 0; i < operatorsArray.length; i++) {
      operator = operatorsArray[i];
      number2 = Number(numberArray[i + 1]);

      switch (operator) {
        case "+":
          calculator.addition(number2);
          break;
        case "-":
          calculator.subtraction(number2);
          break;
        case "÷":
          calculator.division(number2);
          break;
        case "×":
          calculator.multiplication(number2);
          break;
        case "%":
          calculator.remainder(number2);
          break;
      }

      runningHistory(
        Number(numberArray[0]),
        number2,
        operator,
        calculator.getResult()
      );
    }
  } catch (error) {
    if (error instanceof RangeError) {
      console.error("Range Error Occurred: " + error.message);
    } else if (error instanceof ReferenceError) {
      console.error("Reference Error Occurred: " + error.message);
    }
  }

  calcInput.value = calculator.getResult();
}

function runningHistory(number1, number2, operation, result) {
  try {
    switch (operation) {
      case "+":
        console.log(`${number1} + ${number2} = ${result}`);
        displayingHistory(`${number1} + ${number2} = ${result}`);
        break;
      case "-":
        console.log(`${number1} - ${number2} = ${result}`);
        displayingHistory(`${number1} - ${number2} = ${result}`);
        break;
      case "÷":
        console.log(`${number1} ÷ ${number2} = ${result}`);
        displayingHistory(`${number1} ÷ ${number2} = ${result}`);
        break;
      case "×":
        console.log(`${number1} × ${number2} = ${result}`);
        displayingHistory(`${number1} × ${number2} = ${result}`);
        break;
      case "%":
        console.log(`${number1} % ${number2} = ${result}`);
        displayingHistory(`${number1} % ${number2} = ${result}`);
        break;
      case "**":
        console.log(`${number1} ** ${number2} = ${result}`);
        displayingHistory(`${number1} ** ${number2} = ${result}`);
        break;
    }
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference Error Occurred: " + error.message);
    } else if (error instanceof RangeError) {
      console.error("Range Error Occurred: " + error.message);
    }
  }
}

function displayingHistory(context) {
  const button = document.createElement("button");
  button.textContent = context;
  button.value = context;
  button.classList.add("history-containment");
  buttonArray.push(button);
  containerHistory.appendChild(button);
  undo(buttonArray);
}

function showHistory() {
  historySection.style.display = "block";
}

function hideHistory() {
  historySection.style.display = "none";
  counter = 0;
}

function deleteHistory() {
  containerHistory.innerHTML = "";
}

function undo(buttonArray) {
  buttonArray.forEach((button) => {
    button.addEventListener("click", () => {
      let result = button.textContent.split("=")[1];
      calcInput.value = result;
    });
  });
}
