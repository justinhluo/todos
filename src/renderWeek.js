import {allTasks, setActiveProject} from "./store.js";
import { formatFriendlyDate, parseLocalDate } from "./createTask.js";
const content = document.getElementById("content");

export function renderWeek() {
    setActiveProject("week");
    content.innerHTML = "";
    const header = document.createElement("div");
    const title = document.createElement("div");
    const description = document.createElement("div");
    title.textContent = "Upcoming Tasks"
    description.textContent = "Let's get started, don't procrastinate!";
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
      if((formatFriendlyDate(task.date) == parseLocalDate(task.date).toLocaleDateString(undefined, { weekday: "long" })) ||
      (formatFriendlyDate(task.date) == "Today") ||
      (formatFriendlyDate(task.date) == "Tomorrow")) {
        taskContainer.appendChild(task.renderTask());
      }
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