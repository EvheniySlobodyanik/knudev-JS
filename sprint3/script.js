//importing basic/additional operations from module
import { Calculator } from "./modules/arithmetic-operations.js";

//access to buttons 1-9
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

//array for foreach
const numbers = [one, two, three, four, five, six, seven, eight, nine];

//access to buttons simple operations
const divide = document.getElementById("button-divide");
const multiply = document.getElementById("button-multiply");
const minus = document.getElementById("button-minus");
const plus = document.getElementById("button-plus");
const remainder = document.getElementById("button-remainder");
const exponentiation = document.getElementById("button-exponentiation");

//array for foreach
const operations = [
  { button: plus, symbol: "+" },
  { button: minus, symbol: "-" },
  { button: divide, symbol: "÷" },
  { button: multiply, symbol: "×" },
  { button: remainder, symbol: "%" },
];

//access to button additional operations
const root = document.getElementById("button-root");
const oneDivX = document.getElementById("button-1-div-x");
const factorial = document.getElementById("button-factorial");

//access to button that calculates expression
const equals = document.getElementById("button-equals");

//access to special keys buttons
const clear = document.getElementById("button-clear");
const deleteOneSymbol = document.getElementById("button-delete-1-symbol");

//user input
const calcInput = document.getElementById("calc-input");

//all buttons that interact with history of operations
const calcHistory = document.getElementById("calc-history");
const historySection = document.getElementById("history-section");
const containerHistory = document.getElementById("history-container");
const btnClearHistory = document.getElementById("button-clear-history");
let counter = 0;

//array for displaying history(creating) and undo
const buttonArray = [];

//keep track of the most recent operator and number in input
let lastOperator = null;
let lastNumber = null;

//boolean to track if expression has already been calculated
let isCalculated = false;

//for factorial
var f = [];

//to maintain events better
function performEvent(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
}

//breaks input in two arrays
function parseInputExpression(inputExpression) {
  const numberArray = inputExpression.match(/\d+(\.\d+)?/g);
  const operatorsArray = inputExpression.match(/[-+÷×%]/g);
  return { numberArray, operatorsArray };
}

//for additional operations
function check() {
  return !["+", "-", "÷", "×", "%"].includes(calcInput.value);
}

//additional operation button factorial(!)
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

//realizes opportunities of special keys buttons
function specialKeys() {
  performEvent(deleteOneSymbol, "click", () => {
    calcInput.value = getInputExpression().slice(0, -1);
  });

  performEvent(clear, "click", () => {
    calcInput.value = "0";
  });

  performEvent(equals, "click", () => {
    if (calcInput.value.length > 1 && /[-+÷×%]/.test(getInputExpression())) {
      calculating();
      isCalculated = true;
    }
  });
}

//realizes opportunity to have only one operation at the end of expression
//store references to buttons 1-9
//attaches event listeners to number buttons
function getNumbersOperations() {
  performEvent(zero, "click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = getInputExpression().e.replace(/^0+/, "");
    }

    if (!(calcInput.value === "0")) {
      calcInput.value += zero.value;
    }
  });

  numbers.forEach((button) => {
    performEvent(button, "click", () => {
      const lastChar = getInputExpression().e.slice(-1);

      if (isCalculated) {
        isCalculated = false;
      }

      if (["+", "-", "÷", "×", "%"].includes(lastChar)) {
        calcInput.value += button.value;
      } else {
        calcInput.value =
          calcInput.value === "0"
            ? button.value
            : calcInput.value + button.value;
      }
    });
  });

  operations.forEach(({ button, symbol }) => {
    performEvent(button, "click", () => {
      if (isCalculated) {
        isCalculated = false;
      }
      calcInput.value = getInputExpression().replace(/[-+÷×%]$/, "") + symbol;
    });
  });
}

//realizes additional operations like exponentiation, root, factorial and 1/x
function additionalOperations() {
  let flag = check();

  performEvent(exponentiation, "click", () => {
    if (flag) {
      const calculator = new Calculator(Number(getInputExpression()));
      const number1 = Number(getInputExpression());
      calcInput.value = calculator.exponentiation(2).getResult();
      runningHistory(number1, 2, "**", calculator.getResult());
    }
  });

  performEvent(root, "click", () => {
    if (flag) {
      calcInput.value = Number(Math.sqrt(getInputExpression()));
    }
  });

  performEvent(oneDivX, "click", () => {
    calcInput.value = Number(1 / getInputExpression());
  });

  performEvent(factorial, "click", () => {
    if (/^[0-9]+$/.test(getInputExpression())) {
      calcInput.value = calcFactorial(Number(getInputExpression()));
    }
  });
}

//attaches event listeners to buttons history and CH
//hides/shows history based on historySection display and counter value
function historyKeys() {
  performEvent(calcHistory, "click", () => {
    showHistory();

    if (historySection.style.display === "block" && counter === 2) {
      hideHistory();
    }
    counter++;
  });

  performEvent(btnClearHistory, "click", () => {
    deleteHistory();
  });
}

//gets current input value
function getInputExpression() {
  return calcInput.value;
}

//realizes basic operations + remainder based on module code
function performOperation(calculator, operator, number) {
  switch (operator) {
    case "+":
      calculator.addition(number);
      break;
    case "-":
      calculator.subtraction(number);
      break;
    case "÷":
      calculator.division(number);
      break;
    case "×":
      calculator.multiplication(number);
      break;
    case "%":
      calculator.remainder(number);
      break;
  }
}

//realizes all events based on calculating
//handles every mistake that can occur when calculating
//gets calculated value to input
function calculating() {
  const inputExpression = getInputExpression();
  const { numberArray, operatorsArray } = parseInputExpression(inputExpression);

  if (!numberArray || numberArray.length === 0 || !operatorsArray) return;

  let firstNumber = parseFloat(numberArray[0]);
  let calculator = new Calculator(firstNumber);

  try {
    for (let i = 0; i < operatorsArray.length; i++) {
      const operator = operatorsArray[i];
      const number2 = parseFloat(numberArray[i + 1]);

      if (isNaN(number2)) break;

      performOperation(calculator, operator, number2);

      runningHistory(firstNumber, number2, operator, calculator.getResult());
      firstNumber = calculator.getResult();
    }

    lastOperator = operatorsArray[operatorsArray.length - 1] || lastOperator;
    lastNumber = parseFloat(numberArray[numberArray.length - 1]) || lastNumber;
  } catch (error) {
    console.error("Calculation Error:", error.message);
  }

  calcInput.value = calculator.getResult();
}

//based on operation sends data to function getHistory
function runningHistory(number1, number2, operation, result) {
  try {
    switch (operation) {
      case "+":
        getHistory(`${number1} + ${number2} = ${result}`);
        break;
      case "-":
        getHistory(`${number1} - ${number2} = ${result}`);
        break;
      case "÷":
        getHistory(`${number1} ÷ ${number2} = ${result}`);
        break;
      case "×":
        getHistory(`${number1} × ${number2} = ${result}`);
        break;
      case "%":
        getHistory(`${number1} % ${number2} = ${result}`);
        break;
      case "**":
        getHistory(`${number1} ** ${number2} = ${result}`);
        break;
    }
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error("Reference Error Occurred: " + error.message);
    }
  }
}

//shows history of operations in console then screen
function getHistory(expression) {
  console.log(expression);
  displayingHistory(expression);
}

//realizes history of operations(creates blocks, gives it class so it will be styled)
//invokes undo function
function displayingHistory(context) {
  const button = document.createElement("button");
  button.textContent = context;
  button.value = context;
  button.classList.add("history-containment");
  buttonArray.push(button);
  containerHistory.appendChild(button);
  undo(buttonArray);
}

//changes display of section so user can see it
function showHistory() {
  historySection.style.display = "block";
}

//changes display of section so user can`t see it
function hideHistory() {
  historySection.style.display = "none";
  counter = 0;
}

//deletes all blocks of calculated expressions from history of interactions
function deleteHistory() {
  containerHistory.innerHTML = "";
}

//if block clicked, result value from it go to input
function undo(buttonArray) {
  buttonArray.forEach((button) => {
    performEvent(button, "click", () => {
      let result = button.textContent.split("=")[1];
      calcInput.value = result;
    });
  });
}

//invokes main function from where we start everything
getAccess();
function getAccess() {
  getNumbersOperations();
  additionalOperations();
  specialKeys();
  historyKeys();
}
