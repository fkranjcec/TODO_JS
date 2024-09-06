const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.getElementById("taskInput");
  const priority = document.getElementById("priorityInput").value;
  addTaskToList(text.value, priority);
  text.value = "";
  priority.value = "";
});

function addTaskToList(text, priority) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.classList.add(`priority-${priority}`);

  taskItem.innerHTML = `
          <input type="checkbox">
          <span>${text} - ${
    priority.charAt(0).toUpperCase() + priority.slice(1)
  }</span>
          <button id="favorite-btn">⭐</button>
          <button id="delete-btn">❌</button>
        `;
  taskList.appendChild(taskItem);

  taskItem.querySelector("input").addEventListener("click", () => {
    taskItem.classList.toggle("task-completed");
  });

  taskItem.querySelector("#favorite-btn").addEventListener("click", () => {
    taskItem.classList.toggle("task-favorite");
    updateTask();
  });

  taskItem.querySelector("#delete-btn").addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });
}

function updateTask() {
  const taskList = document.querySelector("#task-list");
  Array.from(taskList.children)
    .sort((a, b) =>
      a.classList.contains("task-favorite")
        ? -1
        : b.classList.contains("task-favorite")
        ? 1
        : 0
    )
    .forEach((task) => taskList.appendChild(task));
}
