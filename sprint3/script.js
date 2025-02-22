import { arithmeticOperations } from "./modules/arithmetic-operations.js";

let sendMessage = function () {
  console.log("We are doing simple arithmetic operations!");
};

sendMessage();

console.log(arithmeticOperations("addition", 10, 5));
console.log(arithmeticOperations("subtraction", 10, 5));
console.log(arithmeticOperations("multiplication", 10, 5));
console.log(arithmeticOperations("division", 10, 5));
