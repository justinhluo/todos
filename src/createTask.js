//createtask.js
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
import { allProjects, allTasks, setActiveProject, getActiveProject, saveData } from './store.js';
import { renderTasks } from "./renderTasks.js";
import { Project } from "./createProject.js";
import { renderToday } from "./renderToday.js";
import { renderWeek } from "./renderWeek.js";
import { renderHighPriority } from "./renderHighPriority.js";
import { renderCompleted } from "./renderCompleted.js";

export function createTask(selected) {
    const select = document.getElementById("task-project");
    select.value = selected;
    const dateInput = document.getElementById("task-date");
    dateInput.value = getLocalDateString();
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
    allTasks.unshift(newTask);

    const project = allProjects.find(p => p.name === taskProject.value);

    if (project) {
        project.tasks.unshift(newTask);
    }

    if (getActiveProject() === "today") {
        renderToday();
    } else if (getActiveProject() === "week") {
        renderWeek();
    } else if (getActiveProject() === "high") {
        renderHighPriority();
    } else if (getActiveProject() === "completed") {
        renderCompleted();
    } else if (getActiveProject() != null && getActiveProject().name === taskProject.value) {
        getActiveProject().renderProjectContent();
    } else {
        renderTasks(); 
    }

    form.reset();
    modal.close();
    submit.disabled = true;
    saveData(); 
}

export class Task {
    constructor(name, description, date, priority, project, completed = false) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }
    static fromData(obj) {
        return new Task(
            obj.name,
            obj.description,
            obj.date,
            obj.priority,
            obj.project,
            obj.completed
        );
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
        if(getActiveProject() == "today") {
            renderToday();
        }else if(getActiveProject() == "week") {
            renderWeek();
        }else if(getActiveProject() == "high") {
            renderHighPriority();
        }else if(getActiveProject() == "completed") {
            renderCompleted();
        }else {
            if(getActiveProject() != null) {
                project.renderProjectContent();
            }else {
                renderTasks();
            }
        }
        saveData();      
    }

    renderTask() {
        const deleteTask = document.createElement("img");
        deleteTask.src = deleteIcon;
        deleteTask.classList.add("delete-icon", "delete-task");
        deleteTask.addEventListener("click", (e) => {
            e.stopPropagation();
            this.deleteTask();
        });

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");
        const taskDivContent = document.createElement("div");
        taskDivContent.classList.add("task-div-content", this.priority);
        const taskDivTop = document.createElement("div");
        const taskDivTopRight = document.createElement("div");
        taskDivTopRight.classList.add("task-div-top-right");
        taskDivTop.classList.add("task-div-top");
        const taskDivMiddle = document.createElement("div");
        taskDivMiddle.classList.add("task-div-middle");
        const taskDivBottom = document.createElement("div");
        taskDivBottom.classList.add("task-div-bottom");

        const dateDiv = document.createElement("div");
        
        if(this.date) {
            dateDiv.textContent = formatFriendlyDate(this.date);
        }

        const projectDiv = document.createElement("div");
        
        if(getActiveProject() == null) {
            projectDiv.textContent = this.project;
        }
        
        taskDivTop.appendChild(dateDiv);
        taskDivTopRight.appendChild(projectDiv);
        taskDivTopRight.appendChild(deleteTask);
        taskDivTop.appendChild(taskDivTopRight);
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-div");
        nameDiv.textContent = this.name;

        const completedBtn = document.createElement("input");
        completedBtn.setAttribute("type", "checkbox");
        completedBtn.classList.add("completed-btn");
       
        taskDivMiddle.appendChild(completedBtn);
        taskDivMiddle.appendChild(nameDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description-div");
        descriptionDiv.textContent = this.description;
        taskDivBottom.appendChild(descriptionDiv);
    
        taskDivContent.appendChild(taskDivTop);
        taskDivContent.appendChild(taskDivMiddle);
        taskDivContent.appendChild(taskDivBottom);
        taskDiv.appendChild(taskDivContent);

            const originalBoxShadow = {
                none: "inset 0 0 10px 1px grey",
                high: "inset 0 0 10px 1px red",
                medium: "inset 0 0 10px 1px yellow",
                low: "inset 0 0 10px 1px rgb(69, 218, 49)"
         };

        const defaultBoxShadow = originalBoxShadow[this.priority] || "none";
        taskDivContent.style.boxShadow = defaultBoxShadow;
        completedBtn.addEventListener("click", (e)=> {
            e.stopPropagation();
            this.completed = !this.completed;
            nameDiv.classList.toggle("task-complete");
            descriptionDiv.classList.toggle("task-complete");
            taskDivTop.classList.toggle("task-complete-top");
            if(taskDivContent.classList.contains("task-div-focused")) taskDivContent.classList.remove("task-div-focused");
            taskDivContent.classList.toggle("task-content-disabled");
            if (this.completed) {
                taskDivContent.style.boxShadow = "none";
            } else {
                taskDivContent.style.boxShadow = defaultBoxShadow;
            }

            if(getActiveProject() == "completed") {
                renderCompleted();
            }
            saveData();
        });
        
        if(this.completed == true) {
            completedBtn.setAttribute("checked", "checked");
            nameDiv.classList.toggle("task-complete");
            descriptionDiv.classList.toggle("task-complete");
            taskDivTop.classList.toggle("task-complete-top");
            if(taskDivContent.classList.contains("task-div-focused")) taskDivContent.classList.remove("task-div-focused");
            taskDivContent.classList.toggle("task-content-disabled");
            taskDivContent.style.boxShadow = "none";
        }
        return taskDiv;
    }
}

export function parseLocalDate(yyyyMmDd) {
  const [year, month, day] = yyyyMmDd.split("-").map(Number);
  return new Date(year, month - 1, day); 
}
export function formatFriendlyDate(rawDate) {
  const inputDate = parseLocalDate(rawDate);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  function normalize(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const normalizedInput = normalize(inputDate);
  const normalizedToday = normalize(today);
  const normalizedTomorrow = normalize(tomorrow);

  const msInDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.round((normalizedInput - normalizedToday) / msInDay);

  if (daysDiff === 0) return "Today";
  if (daysDiff === 1) return "Tomorrow";
  if (daysDiff > 1 && daysDiff < 7) {
    return inputDate.toLocaleDateString(undefined, { weekday: "long" }); 
  }
  return inputDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}