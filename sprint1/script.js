const userName = document.getElementById("user-input-name");
let askName = prompt("Enter your name: ");

while (askName === "" || askName === null) {
  askName = prompt("Enter your name: ");
}
userName.textContent = ", " + askName;

function CalcExpression(operation, input1, input2, result) {
  if (input1.value !== "" || input2.value !== "") {
    switch (operation) {
      case "addition":
        result.value = Number(input1.value) + Number(input2.value);
        break;
      case "subtraction":
        result.value = Number(input1.value) - Number(input2.value);
        break;
      case "multiplication":
        result.value = Number(input1.value) * Number(input2.value);
        break;
      case "exponentiation":
        result.value = Number(input1.value) ** Number(input2.value);
        break;
      case "division":
        result.value = Number(input1.value) / Number(input2.value);
        break;
      case "remainder":
        result.value = Number(input1.value) % Number(input2.value);
        break;
    }
  } else {
    result.value = "";
  }
}

document.getElementById("button-addition").addEventListener("click", () => {
  CalcExpression(
    "addition",
    document.getElementById("first-input-addition"),
    document.getElementById("second-input-addition"),
    document.getElementById("result-input-addition")
  );
});

document.getElementById("button-subtraction").addEventListener("click", () => {
  CalcExpression(
    "subtraction",
    document.getElementById("first-input-subtraction"),
    document.getElementById("second-input-subtraction"),
    document.getElementById("result-input-subtraction")
  );
});

document
  .getElementById("button-multiplication")
  .addEventListener("click", () => {
    CalcExpression(
      "multiplication",
      document.getElementById("first-input-multiplication"),
      document.getElementById("second-input-multiplication"),
      document.getElementById("result-input-multiplication")
    );
  });

document
  .getElementById("button-exponentiation")
  .addEventListener("click", () => {
    CalcExpression(
      "exponentiation",
      document.getElementById("first-input-exponentiation"),
      document.getElementById("second-input-exponentiation"),
      document.getElementById("result-input-exponentiation")
    );
  });

document.getElementById("button-division").addEventListener("click", () => {
  CalcExpression(
    "division",
    document.getElementById("first-input-division"),
    document.getElementById("second-input-division"),
    document.getElementById("result-input-division")
  );
});

document.getElementById("button-remainder").addEventListener("click", () => {
  CalcExpression(
    "remainder",
    document.getElementById("first-input-remainder"),
    document.getElementById("second-input-remainder"),
    document.getElementById("result-input-remainder")
  );
});

document.getElementById("form-name-input").value = askName;

document.getElementById("formEl").addEventListener("submit", (event) => {
  event.preventDefault();

  const telInput = document.getElementById("form-tel-input").value;
  const tellError = document.getElementById("tel-error");

  if (/[^0-9]/.test(telInput)) {
    tellError.innerHTML = "'Your tel' input must contain ONLY NUMBERS!";
    tellError.classList.add("error-message");
  } else {
    document.getElementById("formEl").reset();
    document.getElementById("form-name-input").value = askName;
    tellError.innerHTML = "";
    tellError.classList.remove("error-message");
  }
});

document.body.addEventListener("click", (event) => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (event.target.matches("button, input, textarea")) {
    const para = document.createElement("p");
    const node = document.createTextNode(
      "You interacted with: " +
        event.target.tagName +
        " at " +
        `${hours}:${minutes}:${seconds}`
    );
    para.appendChild(node);
    para.classList.add("history-paragraph");
    document.getElementById("history-interactions").appendChild(para);
  } else if (event.target.matches("a")) {
    const para = document.createElement("p");
    const node = document.createTextNode(
      "You interacted with: LINK at " + `${hours}:${minutes}:${seconds}`
    );
    para.appendChild(node);
    para.classList.add("history-paragraph");
    document.getElementById("history-interactions").appendChild(para);
  }
});
