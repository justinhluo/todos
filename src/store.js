
export let allProjects = [];
export let allTasks = [];
let activeProject = null;
export function getActiveProject() {
  return activeProject;
}

export function setActiveProject(project) {
  activeProject = project;
}

export function saveData() {
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
}