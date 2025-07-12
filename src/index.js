import "./styles.css"
import {Project, createProject} from "./createProject.js";
import {Task, createTask } from "./createTask.js";
import { renderTasks } from "./renderTasks.js"
import {allProjects, allTasks, setActiveProject, getActiveProject} from "./store.js";
import { renderToday } from "./renderToday.js";
import { renderWeek } from "./renderWeek.js";
import { renderHighPriority } from "./renderHighPriority.js";
import { renderCompleted } from "./renderCompleted.js";

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
    setActiveProject(null);

});
document.getElementById("week").addEventListener("click", () => {
    renderWeek();
    setActiveProject(null);

});
document.getElementById("high-priority").addEventListener("click", () => {
    renderHighPriority();
    setActiveProject(null);

});
document.getElementById("completed").addEventListener("click", () => {
    renderCompleted();
    setActiveProject(null);

});

const today = new Date().toISOString().split('T')[0];
const defaultTask = new Task("test", "testing", today, "high", "Mow the lawn");
const defaultProject = new Project("Mow the lawn", "I should mow the lawn this weekend...");
defaultProject.tasks.push(defaultTask);
allTasks.unshift(defaultTask);
console.log(allProjects);
// defaultProject.tasks.push(new Task("test", "", "", "high", ""));
// defaultProject.tasks.push(new Task("test", "", "", "high", ""));


renderTasks();


//  click my tasks-> list task objects
//  click today, week, priority, completed -> sort task object then list
//  click add task-> create task object
//  click my projects-> list project objects
//  click add project-> create project object
//  click project -> list project contents (array of task objects)