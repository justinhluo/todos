import { createTask } from "./createTask.js";
import {allProjects, allTasks, setActiveProject} from "./store.js";
import { Project } from './createProject.js';
const content = document.getElementById("content");

export function renderTasks() {
    setActiveProject(null);
    content.innerHTML = "";
    // const headerTop = document.createElement("div");
    
    
    const header = document.createElement("div");
    const title = document.createElement("div");
    const description = document.createElement("div");
    title.textContent = "My tasks"
    description.textContent = "Here you will find all your tasks";
    description.style.fontSize = "0.8rem";
    title.classList.add("header-title");
    header.classList.add("header");
    header.appendChild(title);

    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.classList.add("add-task-btn");
    addTask.addEventListener("click", () => createTask(""));

    //headerTop.appendChild(addTask);
    // header.appendChild(headerTop);
    header.appendChild(description);
    header.appendChild(addTask);
    content.appendChild(header);

    const taskContainer = document.createElement("div");

    taskContainer.classList.add("task-container");

    allTasks.forEach(task=>taskContainer.appendChild(task.renderTask()));

    content.appendChild(taskContainer);

    
}

























if (import.meta.hot) {
  import.meta.hot.decline();
}