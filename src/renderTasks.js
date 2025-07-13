//renderTasks.js
import { createTask } from "./createTask.js";
import {allTasks, setActiveProject} from "./store.js";
const content = document.getElementById("content");

export function renderTasks() {
    setActiveProject(null);
    content.innerHTML = "";
    const header = document.createElement("div");
    const title = document.createElement("div");
    const description = document.createElement("div");
    title.textContent = "My Tasks"
    description.textContent = "Here you will find all your tasks";
    description.style.fontSize = "0.8rem";
    title.classList.add("header-title");
    header.classList.add("header");
    header.appendChild(title);

    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.classList.add("add-task-btn");
    addTask.addEventListener("click", () => createTask(""));
    addTask.classList.add("buttons");

    header.appendChild(description);
    header.appendChild(addTask);
    content.appendChild(header);

    const taskContainer = document.createElement("div");

    taskContainer.classList.add("task-container");

    allTasks.forEach(task => taskContainer.appendChild(task.renderTask()));

    content.appendChild(taskContainer);
    

    const taskDivs = taskContainer.querySelectorAll(".task-div-content");
    taskDivs.forEach(taskDiv => {
      taskDiv.addEventListener('click', () => {
        taskDivs.forEach(t => t.classList.remove("task-div-focused"));
        taskDiv.classList.add("task-div-focused");
      });
    });
    
}

























if (import.meta.hot) {
  import.meta.hot.decline();
}