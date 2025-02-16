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

function HandleEvents(name) {
  document.getElementById(`button-${name}`).addEventListener("click", () => {
    CalcExpression(
      name,
      document.getElementById(`first-input-${name}`),
      document.getElementById(`second-input-${name}`),
      document.getElementById(`result-input-${name}`)
    );
  });
}

HandleEvents("addition");
HandleEvents("subtraction");
HandleEvents("multiplication");
HandleEvents("exponentiation");
HandleEvents("division");
HandleEvents("remainder");

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
