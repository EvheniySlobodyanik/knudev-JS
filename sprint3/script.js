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

const divide = document.getElementById("button-divide");
const multiply = document.getElementById("button-multiply");
const minus = document.getElementById("button-minus");
const plus = document.getElementById("button-plus");
const reminder = document.getElementById("button-reminder");
const exponentiation = document.getElementById("button-exponentiation");

const operations = [
  { button: plus, symbol: "+" },
  { button: minus, symbol: "-" },
  { button: divide, symbol: "/" },
  { button: multiply, symbol: "*" },
];

const root = document.getElementById("button-root");
const oneDivX = document.getElementById("button-1-div-x");
const plusMinus = document.getElementById("button-plus-minus");

const equals = document.getElementById("button-equals");
const comma = document.getElementById("button-comma");

const clear = document.getElementById("button-clear");
const undo = document.getElementById("button-undo");
const deleteOneSymbol = document.getElementById("button-delete-1-symbol");

const calcInput = document.getElementById("calc-input");

const calcHistory = document.getElementById("calc-history");

const calcZone = document.getElementById("calculator-zone");

const calc = new Calculator();

const sendMessage = function () {
  console.log("Arithmetic operations are chained together!");
};

sendMessage();

console.log(
  `Result of addition = ${calc.addition(15).addition(10).getResult()}`
);

console.log(`Result of subtraction = ${calc.subtraction(-5).getResult()}`);

console.log(`Result of division = ${calc.division(10).getResult()}`);

console.log(
  `Result of multiplication = ${calc
    .multiplication(100)
    .multiplication(1000)
    .getResult()}`
);

console.log(`Result of exponentiation = ${calc.exponentiation(2).getResult()}`);

console.log(`Result of remainder = ${calc.remainder(100).getResult()}`);

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

  one.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += one.value;
  });

  two.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += two.value;
  });

  three.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += three.value;
  });

  four.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += four.value;
  });

  five.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += five.value;
  });

  six.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += six.value;
  });

  seven.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += seven.value;
  });

  eight.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += eight.value;
  });

  nine.addEventListener("click", () => {
    if (calcInput.value.startsWith("0")) {
      calcInput.value = calcInput.value.replace(/^0+/, "");
    }
    calcInput.value += nine.value;
  });

  operations.forEach(({ button, symbol }) => {
    button.addEventListener("click", () => {
      calcInput.value = calcInput.value.replace(/[+\-*/]$/, "") + symbol;
    });
  });
}
