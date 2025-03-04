const list = document.getElementById("tasks-list");

const tasks = [];
const displayedList = [];

function createTask(description, id) {
  tasks.push(description);
  const task = document.createElement("li");
  task.textContent = description;
  task.setAttribute("id", id);
  task.classList.add("list-item");
  displayedList.push(task);
  list.appendChild(task);
}

function removeTask(index) {
  tasks.splice(tasks[index], 1);
}

function deleteTask(id) {
  const item = document.getElementById(id);
  list.removeChild(item);
}

createTask("jerk off", "first");
createTask("take bath", "second");
createTask("do homework", "third");
console.log(tasks);

removeTask(0);
deleteTask("first");
console.log(tasks);
