import { createTask } from "./createTask.js";
import {allProjects, allTasks} from "./store.js";
import { Project } from './createProject.js';
const content = document.getElementById("content");

export function renderTasks() {
    content.innerHTML = "";
    const projectHeaderTop = document.createElement("div");
    const projectHeader = document.createElement("div");
    const projectTitle = document.createElement("div");
    const projectDescription = document.createElement("div");
    projectTitle.textContent = "My tasks"
    projectDescription.textContent = "Here you will find all your tasks";
    projectDescription.style.fontSize = "0.8rem";
    projectHeaderTop.classList.add("project-top");
    projectHeader.classList.add("project-header");
    projectHeaderTop.appendChild(projectTitle);

    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.classList.add("add-task-btn");
    addTask.addEventListener("click", () => createTask(""));

    projectHeaderTop.appendChild(addTask);
    projectHeader.appendChild(projectHeaderTop);
    projectHeader.appendChild(projectDescription);
    content.appendChild(projectHeader);

    const taskContainer = document.createElement("div");

    allTasks.forEach(task=>taskContainer.appendChild(task.renderTask()));

    content.appendChild(taskContainer);

    
}

























if (import.meta.hot) {
  import.meta.hot.decline();
}