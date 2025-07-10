const modal = document.getElementById("createProjectModal");
const form = document.getElementById("createProjectForm");
const close = document.getElementById("closeProjectModal");
const text = document.getElementById("createProjectText");
const submit = document.getElementById("submitProject");
const projects = document.getElementById("projects");
const content = document.getElementById("content");
const description = document.getElementById("createProjectDescription");
const optgroup = document.querySelector("optgroup");

import deleteIcon from "/images/delete.png";

import { allProjects, allTasks, getActiveProject, setActiveProject} from './store.js';
import { createTask } from "./createTask.js";

export function createProject() {
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

submit.addEventListener("click", submitProject);

function submitProject(event) {
    event.preventDefault();
    const newProject = new Project(text.value, description.value);
    newProject.renderProjectContent();
    form.reset();
    modal.close();
    submit.disabled = true;
}

export class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.tasks = [];
    allProjects.push(this);

    //create add task button 
    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.classList.add("add-task-btn");
    addTask.addEventListener("click", () => createTask(this.name));
    this.addTask = addTask;
    //add to sidebar
    const projectDiv = document.createElement("div");
    const projectName = document.createElement("span");
    const deleteProject = document.createElement("img");
    projectName.textContent = this.name;
    deleteProject.src = deleteIcon;
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(deleteProject);
    projects.appendChild(projectDiv);
    projectDiv.classList.add("sidebar-project");
    deleteProject.classList.add("delete-icon");
    projectDiv.addEventListener("click", () => {
      this.renderProjectContent();
      setActiveProject(this);
    });
    deleteProject.addEventListener("click", (e) => {
      e.stopPropagation();
      this.deleteProject();
  });
    this.sidebarElement = projectDiv;

    
    const option = document.createElement("option");
    option.value = this.name;
    option.textContent = this.name;
    optgroup.appendChild(option);
    this.optionElement = option;
  }
 
  deleteProject () {
    projects.removeChild(this.sidebarElement);
    optgroup.removeChild(this.optionElement);

    if (getActiveProject() === this) {
      content.innerHTML = "";
      setActiveProject(null);
    }
    const index = allProjects.indexOf(this);
    
    if (index > -1) {
      allProjects.splice(index, 1);
    }
    this.tasks.forEach(task => {
      const index = allTasks.indexOf(task);
      if (index > -1) {
        allTasks.splice(index, 1);
      }
    });
  }

  renderProjectContent() {
    content.innerHTML = "";
    const projectHeaderTop = document.createElement("div");
    const projectHeader = document.createElement("div");
    const projectTitle = document.createElement("div");
    const projectDescription = document.createElement("div");
    projectTitle.textContent = this.name;
    projectDescription.textContent = this.description;
    projectDescription.style.fontSize = "0.8rem";
    projectHeaderTop.classList.add("project-top");
    projectHeader.classList.add("project-header");
    projectHeaderTop.appendChild(projectTitle);
    projectHeaderTop.appendChild(this.addTask);
    projectHeader.appendChild(projectHeaderTop);
    projectHeader.appendChild(projectDescription);
    content.appendChild(projectHeader);

    const taskContainer = document.createElement("div");
    this.tasks.forEach(task=>taskContainer.appendChild(task.renderTask()));
    content.appendChild(taskContainer);
  }

}
