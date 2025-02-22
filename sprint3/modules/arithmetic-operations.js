function arithmeticOperations(operation, x, y) {
  try {
    switch (operation) {
      case "addition":
        return "Your addition equals = " + (x + y);
      case "subtraction":
        return "Your subtraction equals = " + (x - y);
      case "multiplication":
        return "Your multiplication equals = " + x * y;
      case "division":
        if (y === 0) {
          throw new Error("Cannot divide by zero!");
        }
        return "Your division equals = " + x / y;
      default:
        console.log("Wrong operation!");
        break;
    }
  } catch (error) {
    console.error(
      "Error occurred while working with arithmetic operations: ",
      error
    );
    alert(error.message);
  }
}

export { arithmeticOperations };
