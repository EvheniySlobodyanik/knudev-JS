//references to section that contains all tasks blocks
const list = document.getElementById("tasks-list");

///references to all elements of section 'Create'

//reference to form and button to manage form and create task
const formCreate = document.getElementById("form-create");
const buttonCreate = document.getElementById("button-create");

//for getting user input values
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskStatus = document.getElementById("task-status");
const taskDate = document.getElementById("task-date");
///

///references to all elements of section 'Manage'

//container for change and delete task
const containerHidden = document.getElementById("container-hidden");
const deleteContainer = document.getElementById("delete-container");

//select for change and delete task
const selectChangeBlock = document.getElementById("select-change");
const selectDeleteBlock = document.getElementById("select-delete");

//button for change and delete task
const deleteBlock = document.getElementById("delete-block");
const changeBlock = document.getElementById("change-block");

//changed user input values for task
const changeName = document.getElementById("change-name");
const changeDescription = document.getElementById("change-description");
const changeStatus = document.getElementById("change-status");
const changeDate = document.getElementById("change-date");

//two buttons and their container that u see when page loads in section 'Manage'
const buttonContainer = document.getElementById("buttons");
const buttonChange = document.getElementById("button-change");
const buttonDelete = document.getElementById("button-delete");

//references to back button when u press change or delete (there are two different 'back' buttons)
const buttonDeleteBack = document.getElementById("button-back-delete");
const buttonChangeBack = document.getElementById("button-back-change");
///

//to check date in inputs (form + 'Manage' container)
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

//loading tasks from storage to screen + saving their order to use sort by priority
window.onload = function () {
  loadTaskFromLocalStorage();
  saveOriginalOrder();
};

//for sorting by priority(how it looked originally)
function saveOriginalOrder() {
  const listItems = Array.from(document.querySelectorAll("li"));
  originalOrder = listItems.map((item) => item); //save reference to original elements
}

//persist tasks
function loadTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //creating tasks -> adding class to it, adding it to list -> create options for select in 'Manage'
  tasks.forEach((task) => {
    const block = document.createElement("li");
    block.innerHTML = `
      <p>Name: ${task.name}</p>
      <p>Description: ${task.description}</p>
      <p>Status: ${task.status}</p>
      <p>DueDate: ${task.dueDate}</p>
    `;
    block.classList.add("list-item", "fade-slide-in");
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

  //manage array: update containment or leave it if no updates
  tasks = tasks.map((task) =>
    task.name === oldName ? { ...task, ...newTaskData } : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//handle events
function attachEvent(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
}

//create error message using passed text, used for date(>today) and empty form
function createError(text) {
  const message = document.createElement("p");
  message.textContent = text;
  message.classList.add("error-message");
  formCreate.appendChild(message);
}

//create option for two selects in section 'Manage' based on name from task
function createOptions(nameValue) {
  const option = document.createElement("option");
  option.value = nameValue;
  option.innerHTML = nameValue;
  selectChangeBlock.appendChild(option.cloneNode(true));
  selectDeleteBlock.appendChild(option.cloneNode(true));
}

//refresh options using local storage in real time
function refreshOptions() {
  selectChangeBlock.innerHTML = "";
  selectDeleteBlock.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createOptions(task.name);
  });
}

//create object
function Task(name, description, status, dueDate) {
  this.name = name;
  this.description = description;
  this.status = status;
  this.dueDate = dueDate;
}

//create list object(task), give it class and add it to the list ul
function createTaskItem(name, description, status, dueDate) {
  const block = document.createElement("li");
  block.innerHTML = `
    <p>Name: ${name}</p>
    <p>Description: ${description}</p>
    <p>Status: ${status}</p>
    <p>DueDate: ${dueDate}</p>
  `;
  block.classList.add("list-item");
  list.appendChild(block); // Assuming your list has an id="list"
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

  createTaskItem(name, description, status, dueDate);

  // const block = document.createElement("li");
  // block.innerHTML = `
  // <p>Name: ${name}</p>
  // <p>Description: ${description}</p>
  // <p>Status: ${status}</p>
  // <p>DueDate: ${dueDate}</p>
  // `;
  // block.classList.add("list-item");
  // list.appendChild(block);
}

//change anything in task and save changes permanently
function changeTask() {
  const selectedTaskName = selectChangeBlock.value;
  const items = list.querySelectorAll("li");

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].textContent.includes(selectedTaskName)) {
      list.removeChild(items[i]);

      //update the UI
      createTaskItem(
        changeName.value,
        changeDescription.value,
        changeStatus.value,
        changeDate.value
      );

      //update localStorage
      updateTaskInLocalStorage(selectedTaskName, {
        name: changeName.value,
        description: changeDescription.value,
        status: changeStatus.value,
        dueDate: changeDate.value,
      });

      refreshOptions();
    }
  }
}

//delete any task completely
function deleteTask() {
  const items = list.querySelectorAll("li");

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].textContent.includes(selectDeleteBlock.value)) {
      //added class for deleting animation
      items[i].classList.add("fade-slide-out");

      //after the animation ends, remove the task
      setTimeout(() => {
        deleteTaskFromLocalStorage(selectDeleteBlock.value); //remove from localStorage
        list.removeChild(items[i]); //remove from UI
        refreshOptions();
      }, 400);
    }
  }
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
    refreshOptions();

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

//perform sorting on certain option
attachEvent(buttonSort, "click", () => {
  selectSorting();
});
