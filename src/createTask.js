const modal = document.getElementById("create-task-modal");
const form = document.getElementById("createTaskForm");
const close = document.getElementById("closeTaskModal");
const text = document.getElementById("createTaskText");
const description = document.getElementById("createTaskDescription");
const date = document.getElementById("task-date");
const priority = document.getElementById("task-priority");
const taskProject = document.getElementById("task-project");
const submit = document.getElementById("submitTask");
const content = document.getElementById("content");
import deleteIcon from "/images/delete.png";
import { allProjects, allTasks, setActiveProject, getActiveProject } from './store.js';
import { renderTasks } from "./renderTasks.js";
import { Project } from "./createProject.js";


export function createTask(selected) {
    const select = document.getElementById("task-project");
    select.value = selected;
    modal.showModal();
}

close.addEventListener("click", () => {
    modal.close();
    form.reset();
    submit.disabled = true;
});
text.addEventListener("input", ()=> {
    if(text.value.trim() === "") {
        submit.disabled = true;
    } else {
        submit.disabled = false;
    }
});

submit.addEventListener("click", submitTask);

function submitTask(event) {
    event.preventDefault();
    const newTask = new Task(text.value, description.value, date.value, priority.value, taskProject.value);
    const project = allProjects.find(p => p.name === taskProject.value);
    if(taskProject.value !== "") {
        
        if (project) {
            project.tasks.push(newTask);
        }
    }
    allTasks.push(newTask);
    console.log(allTasks);
    console.log(allProjects);

    
    form.reset();
    modal.close();
    submit.disabled = true;

    if(getActiveProject() != null) {
        project.renderProjectContent();
    }else {
        renderTasks();
    }
    
}

export class Task {
    constructor(name, description, date, priority, project) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project;
        const deleteTask = document.createElement("img");
        deleteTask.src = deleteIcon;
        deleteTask.classList.add("delete-icon");
        deleteTask.addEventListener("click", (e) => {
            e.stopPropagation();
            this.deleteTask();
        });
        this.deleteIcon = deleteTask;

    }

    deleteTask() {
        alert("STOP");
        const index = allTasks.indexOf(this);
    
        if (index > -1) {
            allTasks.splice(index, 1);
        }

        const project = allProjects.find(p => p.name === this.project);
        if (project) {
            const projectTaskIndex = project.tasks.indexOf(this);
            if (index > -1) {
               project.tasks.splice(projectTaskIndex, 1);
            }
        }
        if(getActiveProject() != null) {
            project.renderProjectContent();
        }else {
            renderTasks();
        }
        
    }

    renderTask() {
        const taskDiv = document.createElement("div");
        const nameDiv = document.createElement("div");
        nameDiv.textContent = this.name;

        taskDiv.appendChild(nameDiv);
        taskDiv.appendChild(this.deleteIcon);

        if(this.priority = "") {
            taskDiv.style.border = "1px solid grey";
        }else if (this.priority = "high") {
            taskDiv.style.border = "1px solid red";
        }else if (this.priority = "medium") {
            taskDiv.style.border = "1px solid yellow";
        }else if (this.priority = "low") {
            taskDiv.style.border = "1px solid blue";
        }
        return taskDiv;
    }
}



if (import.meta.hot) {
  import.meta.hot.decline();
}