const modal = document.getElementById("createProjectModal");
const form = document.getElementById("createProjectForm");
const close = document.getElementById("closeProjectModal");
const text = document.getElementById("createProjectText");
const submit = document.getElementById("submitProject");
const projects = document.getElementById("projects");
document.getElementById("createProject").addEventListener("click", createProject);
import { projectArr } from './index.js';

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

function createProject() {
    modal.showModal();
}


submit.addEventListener("click", submitProject);

function submitProject(event) {
    event.preventDefault();
    const newProject = new Project(text.value);
    projectArr.push(newProject);
    const projectDiv = document.createElement("div");
    projectDiv.textContent = newProject.name;
    projects.appendChild(projectDiv);
    form.reset();
    modal.close();
    submit.disabled = true;
    console.log(projectArr);
   
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

// export{createProject};