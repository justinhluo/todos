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
    allTasks.unshift(newTask);

    if (project) {
        project.tasks.unshift(newTask);
        if(getActiveProject() == null) {
            renderTasks();
        }
        else if(getActiveProject().name == project.name) {
            project.renderProjectContent();
        }
    }
    else {
        if(getActiveProject() == null) {
            renderTasks();
        }
    }

    form.reset();
    modal.close();
    submit.disabled = true;

}

export class Task {
    constructor(name, description, date, priority, project) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project;
        this.completed = false;
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
        taskDiv.classList.add("task-div");
        const taskDivContent = document.createElement("div");
        taskDivContent.classList.add("task-div-content");
        const taskDivTop = document.createElement("div");
        taskDivTop.classList.add("task-div-top");
        const taskDivMiddle = document.createElement("div");
        taskDivMiddle.classList.add("task-div-middle");
        const taskDivMiddleLeft = document.createElement("div");
        taskDivMiddleLeft.classList.add("task-div-middle-left");
        const taskDivBottom = document.createElement("div");
        taskDivBottom.classList.add("task-div-bottom");

        const dateDiv = document.createElement("div");
        dateDiv.textContent = this.date;
        
        const projectDiv = document.createElement("div");
        
        if(getActiveProject() == null) {
            projectDiv.textContent = this.project;
        }
        
        taskDivTop.appendChild(dateDiv);
        taskDivTop.appendChild(projectDiv);
        
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-div");
        nameDiv.textContent = this.name;

        const completedBtn = document.createElement("input");
        completedBtn.setAttribute("type", "checkbox");
        completedBtn.classList.add("completed-btn");
        
        taskDivMiddleLeft.appendChild(completedBtn);
        taskDivMiddleLeft.appendChild(nameDiv);
        taskDivMiddle.appendChild(taskDivMiddleLeft);
        taskDivMiddle.appendChild(this.deleteIcon);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description-div");
        descriptionDiv.textContent = this.description;
        taskDivBottom.appendChild(descriptionDiv);
    
        taskDivContent.appendChild(taskDivTop);
        taskDivContent.appendChild(taskDivMiddle);
        taskDivContent.appendChild(taskDivBottom);
        taskDiv.appendChild(taskDivContent);
        completedBtn.addEventListener("click", (e)=> {
            e.stopPropagation();
            this.completed = !this.completed;
            nameDiv.classList.toggle("task-complete");
            descriptionDiv.classList.toggle("task-complete");
            taskDivTop.classList.toggle("task-complete-top");
        });
        
        if(this.completed == true) {
            completedBtn.setAttribute("checked", "checked");
            nameDiv.classList.toggle("task-complete");
            descriptionDiv.classList.toggle("task-complete");
            taskDivTop.classList.toggle("task-complete-top");
        }

        taskDivContent.addEventListener("click", () => taskDivContent.classList.toggle("task-div-focused"))

       

        // if(this.priority == "") {
        //     taskDiv.style.borderBottom = "1px solid grey";
        // }else if (this.priority == "high") {
            
        
        // }else if (this.priority == "medium") {
        //     taskDiv.style.borderBottom = "1px solid yellow";
        // }else if (this.priority == "low") {
        //     taskDiv.style.borderBottom = "1px solid blue";
        // }
        return taskDiv;
    }
}



if (import.meta.hot) {
  import.meta.hot.decline();
}