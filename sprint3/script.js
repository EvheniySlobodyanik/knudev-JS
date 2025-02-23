import { Calculator } from "./modules/arithmetic-operations.js";

const sendMessage = function () {
  console.log("Arithmetic operations are chained together!");
};

sendMessage();

const calc = new Calculator();

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
