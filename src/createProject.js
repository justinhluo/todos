const modal = document.getElementById("createProjectModal");
const form = document.getElementById("createProjectForm");
const close = document.getElementById("closeProjectModal");
const text = document.getElementById("createProjectText");
const submit = document.getElementById("submitProject");
const projects = document.getElementById("projects");
const content = document.getElementById("content");
const description = document.getElementById("createProjectDescription");
let activeProject = null;
import deleteIcon from "/images/delete.png";
import './createTask.js';
import { allProjects, allTasks } from './store.js';

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
    newProject.renderContent();
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

    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.classList.add("add-task-btn");
    addTask.addEventListener("click", () => alert(this.name));
    this.addTask = addTask;

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
    projectDiv.addEventListener("click", () => this.renderContent());
    deleteProject.addEventListener("click", (e) => {
      e.stopPropagation();
      this.deleteProject();
  });
    this.sidebarElement = projectDiv;
  }
    
  // addToSidebar() {

  // }

  deleteProject () {
    projects.removeChild(this.sidebarElement);

    if (activeProject === this) {
      content.innerHTML = "";
      activeProject = null;
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

  renderContent() {
    activeProject = this;
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

    //create tasks container
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
