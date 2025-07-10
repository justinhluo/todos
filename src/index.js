import "./styles.css"
import {Project, createProject} from "./createProject.js";
import {Task, createTask } from "./createTask.js";
import { renderTasksHeader } from "./renderTasks.js"
import {allProjects, allTasks} from "./store.js";


document.getElementById("createProject").addEventListener("click", createProject);
document.getElementById("createTask").addEventListener("click", (e) => {
    e.stopPropagation();
    createTask();
});
document.getElementById("my-tasks").addEventListener("click", renderTasksHeader);



const defaultProject = new Project("Home", "This is a test project, feel free to delete.");
// defaultProject.addToSidebar();
// defaultProject.renderContent();

renderTasksHeader();


//  click my tasks-> list task objects
//  click today, week, priority, completed -> sort task object then list
//  click add task-> create task object
//  click my projects-> list project objects
//  click add project-> create project object
//  click project -> list project contents (array of task objects)