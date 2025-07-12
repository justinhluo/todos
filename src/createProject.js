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
import deleteIconLarge from "/images/delete_large.png";

import { allProjects, allTasks, getActiveProject, setActiveProject, saveData} from './store.js';
import { createTask } from "./createTask.js";
import { renderTasks } from "./renderTasks.js";

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
    saveData();
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
    projectName.textContent = "# " + this.name;
    deleteProject.src = deleteIcon;
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(deleteProject);
    projects.appendChild(projectDiv);
    projectName.classList.add("sidebar-project-name");
    projectDiv.classList.add("sidebar-project");
    deleteProject.classList.add("delete-icon", "sidebar-delete");
    projectDiv.addEventListener("click", () => {
      this.renderProjectContent();
      
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
  
  static fromData(obj) {
    const project = new Project(obj.name, obj.description);
    project.tasks = obj.tasks.map(Task.fromData); 
    return project;
  }
 
  deleteProject () {
    projects.removeChild(this.sidebarElement);
    optgroup.removeChild(this.optionElement);

    if (getActiveProject() == this) {

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
    
    if(getActiveProject() == null) {
      renderTasks();
    }
    saveData();
  }

  renderProjectContent() {
    setActiveProject(this);
    content.innerHTML = "";
    const header = document.createElement("div");
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const title = document.createElement("div");
    const description = document.createElement("div");
    
    description.textContent = this.description;
    title.classList.add("header-title");
    header.classList.add("header");
    description.classList.add("description");
    header.appendChild(title);
    
    const deleteProjectLarge = document.createElement("img");
    deleteProjectLarge.src = deleteIconLarge;
    deleteProjectLarge.addEventListener("click", (e) => {
      this.deleteProject();
    });
    deleteProjectLarge.classList.add("delete-icon");
    buttons.appendChild(this.addTask);
    buttons.appendChild(deleteProjectLarge);
    title.textContent = this.name;
    header.appendChild(description);
    header.appendChild(buttons);

    content.appendChild(header);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    this.tasks.forEach(task=>taskContainer.appendChild(task.renderTask()));
    content.appendChild(taskContainer);
  
    const taskDivs = taskContainer.querySelectorAll('.task-div-content');
    taskDivs.forEach(taskDiv => {
      taskDiv.addEventListener('click', () => {
        taskDivs.forEach(t => t.classList.remove('task-div-focused'));
        taskDiv.classList.add('task-div-focused');
      });
    });

  }

}
