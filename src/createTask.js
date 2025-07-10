const modal = document.getElementById("createTaskModal");
const form = document.getElementById("createTaskForm");
const close = document.getElementById("closeTaskModal");
const text = document.getElementById("createTaskText");
const description = document.getElementById("createTaskDescription");
const date = document.getElementById("task-date");
const priority = document.getElementById("task-priority");
const taskProject = document.getElementById("task-project");
const submit = document.getElementById("submitTask");
const content = document.getElementById("content");

import { allProjects, allTasks } from './store.js';

export function createTask() {
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
    form.reset();
    modal.close();
    submit.disabled = true;
    newTask.renderTask();
}

export class Task {
    constructor(name, description, date, priority, project = "My tasks") {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project
    }

    renderTask() {
        alert(this.name + this.description + this.date + this.priority + this.project)
    }
}