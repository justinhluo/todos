
export const allProjects = [];
export const allTasks = [];
let activeProject = null;
export function getActiveProject() {
  return activeProject;
}

export function setActiveProject(project) {
  activeProject = project;
}
