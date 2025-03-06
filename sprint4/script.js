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
const buttonDeleteBack = document.getElementById("button-back-delete");
const buttonChangeBack = document.getElementById("button-back-change");

//to check date in inputs
const today = new Date();

//variables for sorting
const buttonSort = document.getElementById("sort-button");
const selectSort = document.getElementById("sort-select");
let originalOrder = [];

//Save a page visited count
let visitCount = parseInt(localStorage.getItem("visitCount")) || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);

//Display page visited count
const paraVisit = document.getElementById("para-visit");
paraVisit.textContent = `You visited this page ${visitCount} times!`;

window.onload = function () {
  loadTaskFromLocalStorage();
  saveOriginalOrder();
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

function createError(text) {
  const message = document.createElement("p");
  message.textContent = text;
  message.classList.add("error-message");
  formCreate.appendChild(message);
}

//manage form
attachEvent(formCreate, "submit", (event) => {
  event.preventDefault();

  //remove any existing error messages
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

  //for date checking
  const dateValue = new Date(taskDate.value);
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const isTodayOrGreater = dateValue >= todayDateOnly;

  if (
    taskName.value !== "" &&
    taskDescription.value !== "" &&
    taskStatus.value !== "" &&
    taskDate.value !== "" &&
    isTodayOrGreater
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
      if (!isTodayOrGreater) {
        createError("Date must be equal or greater than today!");
      } else {
        createError("All fields MUST contain VALUE!");
      }
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

//for sorting by priority(how it looked originally)
function saveOriginalOrder() {
  const listItems = Array.from(document.querySelectorAll("li"));
  originalOrder = listItems.map((item) => item); //save reference to original elements
}

//getting selected option for sorting
function selectSorting() {
  if (selectSort.value === "dueDate") {
    sortTasks("dueDate");
  } else {
    sortTasks("priority");
  }
}

//sorting tasks by selected options above
function sortTasks(type) {
  if (type === "dueDate") {
    const listItems = Array.from(document.querySelectorAll("li"));

    //extracting dueDates and associating them with list items
    const tasksWithDates = listItems.map((item) => {
      const dueDateParagraph = Array.from(item.querySelectorAll("p")).find(
        (p) => p.textContent.includes("DueDate:")
      );

      //extract date or use a placeholder for missing dates
      const dueDate = dueDateParagraph
        ? dueDateParagraph.textContent.split("DueDate: ")[1]
        : "9999-12-31";

      return { item, dueDate };
    });

    //sort items by dueDate (ascending order)
    tasksWithDates.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    //reorder DOM elements based on sorted order
    tasksWithDates.forEach(({ item }) => list.appendChild(item));
  } else {
    originalOrder.forEach((item) => list.appendChild(item));
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

//go back to original state of manage container
attachEvent(buttonChangeBack, "click", () => {
  containerHidden.style.display = "none";
  buttons.style.display = "flex";
});
attachEvent(buttonDeleteBack, "click", () => {
  deleteContainer.style.display = "none";
  buttons.style.display = "flex";
});

//perform sorting on certain option
attachEvent(buttonSort, "click", () => {
  selectSorting();
});
