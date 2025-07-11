import "./styles.css"
import {Project, createProject} from "./createProject.js";
import {Task, createTask } from "./createTask.js";
import { renderTasks } from "./renderTasks.js"
import {allProjects, allTasks, setActiveProject, getActiveProject} from "./store.js";

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



const defaultProject = new Project("Mow the lawn", "I should mow the lawn this weekend...");
defaultProject.tasks.push(new Task("test", "", "", "high", ""));
renderTasks();


//  click my tasks-> list task objects
//  click today, week, priority, completed -> sort task object then list
//  click add task-> create task object
//  click my projects-> list project objects
//  click add project-> create project object
//  click project -> list project contents (array of task objects)