function Calculator(value = 0) {
  let _value = value;

  return {
    addition(n) {
      _value += n;
      return this;
    },

    subtraction(n) {
      _value -= n;
      return this;
    },

    multiplication(n) {
      _value *= n;
      return this;
    },

    division(n) {
      if (n !== 0) {
        _value /= n;
      } else {
        console.log("Division by zero!");
      }
      return this;
    },

    remainder(n) {
      if (n !== 0) {
        _value %= n;
      } else {
        console.log("Division by zero!");
      }
      return this;
    },

    exponentiation(n) {
      _value **= n;
      return this;
    },

    getResult() {
      return _value;
    },
  };
}

export { Calculator };
