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

const equals = document.getElementById("button-equals");
const comma = document.getElementById("button-comma");

const clear = document.getElementById("button-clear");
const undo = document.getElementById("button-undo");
const deleteOneSymbol = document.getElementById("button-delete-1-symbol");

const calcInput = document.getElementById("calc-input");

const calcHistory = document.getElementById("calc-history");

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

getAccess();

function getAccess() {
  calcInput.addEventListener(
    "keypress",
    () => {
      calcInput.value = "";
    },
    { once: true }
  );

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
      calcInput.value = calcInput.value.replace(",", "");
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

  comma.addEventListener("click", () => {
    if (
      !(
        calcInput.value === "+" ||
        calcInput.value === "-" ||
        calcInput.value === "÷" ||
        calcInput.value === "×" ||
        calcInput.value === "%" ||
        calcInput.value.endsWith(",")
      )
    ) {
      calcInput.value += comma.value;
    }
  });

  equals.addEventListener("click", () => calculating());
}

function calculating() {
  const numberArray = calcInput.value.match(/(\d+)/g);
  const operatorsArray = calcInput.value.match(/(\D)/g);

  let calculator = new Calculator(Number(numberArray[0]));

  let number2;
  let operator;

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

  calcInput.value = calculator.getResult();
}

function runningHistory(number1, number2, operation, result) {
  switch (operation) {
    case "+":
      console.log(`${number1} + ${number2} = ${result}`);
      break;
    case "-":
      console.log(`${number1} - ${number2} = ${result}`);
      break;
    case "÷":
      console.log(`${number1} ÷ ${number2} = ${result}`);
      break;
    case "×":
      console.log(`${number1} × ${number2} = ${result}`);
      break;
    case "%":
      console.log(`${number1} % ${number2} = ${result}`);
      break;
    case "**":
      console.log(`${number1} ** ${number2} = ${result}`);
      break;
  }
}
