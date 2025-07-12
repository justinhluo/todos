import "./styles.css"
import {Project, createProject} from "./createProject.js";
import {Task, createTask } from "./createTask.js";
import { renderTasks } from "./renderTasks.js"
import {allTasks, allProjects, setActiveProject} from "./store.js";
import { renderToday } from "./renderToday.js";
import { renderWeek } from "./renderWeek.js";
import { renderHighPriority } from "./renderHighPriority.js";
import { renderCompleted } from "./renderCompleted.js";

function loadData() {
  const storedProjects = localStorage.getItem("allProjects");
  const storedTasks = localStorage.getItem("allTasks");

  if (storedProjects) {
    const parsedProjects = JSON.parse(storedProjects).map(Project.fromData);

    allProjects.length = 0; 
    allProjects.push(...parsedProjects); 
  }

  if (storedTasks) {
    const parsedTasks = JSON.parse(storedTasks).map(Task.fromData);

    allTasks.length = 0;
    allTasks.push(...parsedTasks);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderTasks();
});

document.getElementById("createProject").addEventListener("click", (e) => {
    e.stopPropagation();
    createProject();
});
document.getElementById("create-task").addEventListener("click", (e) => {
    e.stopPropagation();
    createTask("");
    
});
document.getElementById("my-tasks").addEventListener("click", () => {
    renderTasks();
    setActiveProject(null);

});

document.getElementById("today").addEventListener("click", () => {
    renderToday();
    setActiveProject("today");

});
document.getElementById("week").addEventListener("click", () => {
    renderWeek();
    setActiveProject("week");

});
document.getElementById("high-priority").addEventListener("click", () => {
    renderHighPriority();
    setActiveProject("high");

});
document.getElementById("completed").addEventListener("click", () => {
    renderCompleted();
    setActiveProject("completed");

});