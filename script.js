let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  const category = document.querySelector(
    'input[name="category"]:checked'
  ).value;

  if (taskText !== "") {
    const newTask = {
      text: taskText,
      category: category,
      completed: false,
      editMode: false,
    };

    tasks.push(newTask);
    displayTasks();
    taskInput.value = "";
  }
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    if (task.editMode) {
      listItem.innerHTML = `
        <input type="text" value="${task.text}">
        <button class="editbtn" onclick="saveEdit(${index})">Save</button>
      `;
    } else {
      listItem.innerHTML = `
        <span class="${task.completed ? "completed" : ""}">${task.text} (${
        task.category
      })</span>
        <div>
          <button class="completebtn" onclick="toggleComplete(${index})">${
        task.completed ? "Undo" : "Complete"
      }</button>
          <button class="editbtn" onclick="toggleEdit(${index})">${
        task.editMode ? "Cancel" : "Edit"
      }</button>
          <button class="deletebtn" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
    }

    taskList.appendChild(listItem);
  });
}

function toggleEdit(index) {
  tasks[index].editMode = !tasks[index].editMode;
  displayTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function saveEdit(index) {
  const input = document.querySelector("li input");
  tasks[index].text = input.value;
  tasks[index].editMode = false;
  displayTasks();
}
