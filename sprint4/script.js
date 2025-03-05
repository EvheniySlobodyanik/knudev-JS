//references to section that contains all tasks blocks
const list = document.getElementById("tasks-list");

//references to all elements of section 'Create'
const formCreate = document.getElementById("form-create");
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskStatus = document.getElementById("task-status");
const taskDate = document.getElementById("task-date");
const buttonCreate = document.getElementById("button-create");

//references to all elements of section 'Manage'
const containerHidden = document.getElementById("container-hidden");
const deleteContainer = document.getElementById("delete-container");
const selectChangeBlock = document.getElementById("select-change");
const selectDeleteBlock = document.getElementById("select-delete");
const deleteBlock = document.getElementById("delete-block");
const changeBlock = document.getElementById("change-block");
const changeName = document.getElementById("change-name");
const changeDescription = document.getElementById("change-description");
const changeStatus = document.getElementById("change-status");
const changeDate = document.getElementById("change-date");
const buttonContainer = document.getElementById("buttons");
const buttonChange = document.getElementById("button-change");
const buttonDelete = document.getElementById("button-delete");

//Save a page visited count
let visitCount = parseInt(localStorage.getItem("visitCount")) || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);

//Display page visited count
const paraVisit = document.getElementById("para-visit");
paraVisit.textContent = `You visited this page ${visitCount} times!`;

window.onload = function () {
  loadTaskFromLocalStorage();
};

//persist tasks
function loadTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const block = document.createElement("li");
    block.innerHTML = `
      <p>Name: ${task.name}</p>
      <p>Description: ${task.description}</p>
      <p>Status: ${task.status}</p>
      <p>DueDate: ${task.dueDate}</p>
    `;
    block.classList.add("list-item");
    list.appendChild(block);

    createOptions(task.name);
  });
}

//delete tasks from storage by name
function deleteTaskFromLocalStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //Filter out the task with the given name
  tasks = tasks.filter((task) => task.name !== taskName);

  //Save the updated tasks back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//update task in localStorage
function updateTaskInLocalStorage(oldName, newTaskData) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) =>
    task.name === oldName ? { ...task, ...newTaskData } : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//handle events
function attachEvent(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
}

//create object
function Task(name, description, status, dueDate) {
  this.name = name;
  this.description = description;
  this.status = status;
  this.dueDate = dueDate;
}

//create task on screen
//using destructuring in args to take taskData
function createTask({ name, description, status, dueDate }) {
  //using destructuring {] in args so i don`t need to create new Task and then address to it, so directly
  const task = { name, description, status, dueDate };

  //save tasks to storage
  let tasks = JSON.parse(localStorage.getItem(`tasks`)) || [];
  tasks.push(task);
  localStorage.setItem(`tasks`, JSON.stringify(tasks));

  const block = document.createElement("li");
  block.innerHTML = `
  <p>Name: ${name}</p>
  <p>Description: ${description}</p>
  <p>Status: ${status}</p>
  <p>DueDate: ${dueDate}</p>
  `;
  block.classList.add("list-item");
  list.appendChild(block);
}

//manage form
attachEvent(formCreate, "submit", (event) => {
  event.preventDefault();

  if (
    taskName.value !== "" &&
    taskDescription.value !== "" &&
    taskStatus.value !== "" &&
    taskDate.value !== ""
  ) {
    //using destructuring to pass variables to function better
    const taskData = {
      name: taskName.value,
      description: taskDescription.value,
      status: taskStatus.value,
      dueDate: taskDate.value,
    };

    createTask(taskData);
    createOptions(taskData.name);

    formCreate.reset();
  } else {
    if (!document.querySelector(".error-message")) {
      const message = document.createElement("p");
      message.textContent = "All fields MUST contain value!";
      message.classList.add("error-message");
      formCreate.appendChild(message);
    }
  }
});

//create option for two selects based on name from task
function createOptions(nameValue) {
  const option = document.createElement("option");
  option.value = nameValue;
  option.innerHTML = nameValue;
  selectChangeBlock.appendChild(option.cloneNode(true));
  selectDeleteBlock.appendChild(option.cloneNode(true));
}

//change anything in task and save changes permanently
function changeTask() {
  const selectedTaskName = selectChangeBlock.value;
  const items = list.querySelectorAll("li");

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].textContent.includes(selectedTaskName)) {
      //update the UI
      items[i].innerHTML = `
        <p>Name: ${changeName.value}</p>
        <p>Description: ${changeDescription.value}</p>
        <p>Status: ${changeStatus.value}</p>
        <p>DueDate: ${changeDate.value}</p>
      `;

      //update localStorage
      updateTaskInLocalStorage(selectedTaskName, {
        name: changeName.value,
        description: changeDescription.value,
        status: changeStatus.value,
        dueDate: changeDate.value,
      });
    }
  }
}

//delete any task completely
function deleteTask() {
  const items = list.querySelectorAll("li");

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].textContent.includes(selectDeleteBlock.value)) {
      deleteTaskFromLocalStorage(selectDeleteBlock.value); //remove from localStorage
      list.removeChild(items[i]); //remove from UI
    }
  }
}

//show UI for deleting task(block)
attachEvent(buttonChange, "click", () => {
  containerHidden.style.display = "flex";
  buttons.style.display = "none";
});

//show UI for changing task(block)
attachEvent(buttonDelete, "click", () => {
  deleteContainer.style.display = "flex";
  buttons.style.display = "none";
});
