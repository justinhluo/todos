import {allTasks, setActiveProject} from "./store.js";
import { formatFriendlyDate } from "./createTask.js";
const content = document.getElementById("content");

export function renderToday() {
    setActiveProject("today");
    content.innerHTML = "";
    const header = document.createElement("div");
    const title = document.createElement("div");
    const description = document.createElement("div");
    title.textContent = "Today's Tasks"
    description.textContent = "Tasks due today! Don't delay!";
    description.style.fontSize = "0.8rem";
    description.style.marginBottom = "20px";
    title.classList.add("header-title");
    header.classList.add("header");
    header.appendChild(title);
    header.appendChild(description);
    content.appendChild(header);
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    allTasks.forEach(task => {
      if(formatFriendlyDate(task.date) == "Today") taskContainer.appendChild(task.renderTask());
    });
    content.appendChild(taskContainer);
    
    const taskDivs = taskContainer.querySelectorAll('.task-div-content');
    taskDivs.forEach(taskDiv => {
      taskDiv.addEventListener('click', () => {
        taskDivs.forEach(t => t.classList.remove('task-div-focused'));
        taskDiv.classList.add('task-div-focused');
      });
    }); 
}