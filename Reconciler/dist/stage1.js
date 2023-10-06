"use strict";
var _a;
// Creates and displays DOM elements for tasks.
function createTaskElements(taskData) {
    const taskContainer = document.getElementById("stage1");
    if (taskContainer) {
        taskContainer.innerHTML = "";
    }
    else {
        console.error("Task container not found.");
        return;
    }
    let tasksAdded = 0;
    taskData.forEach(function (task) {
        tasksAdded++;
        const taskElement = document.createElement("div");
        taskElement.dataset.id = task.id.toString();
        const titleElement = document.createElement("span");
        titleElement.textContent = task.title;
        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = task.description;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("onclick", `deleteTask(${task.id})`);
        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(deleteButton);
        if (taskContainer) {
            taskContainer.appendChild(taskElement);
        }
    });
    console.log(`Tasks added: ${tasksAdded}`);
}
// Generates random tasks and displays them using the createTaskElements function.
function generateRandomTasksStage1() {
    const tasks = [];
    for (let i = 0; i < Math.floor(Math.random() * 15); i++) {
        tasks.push({
            title: "Go to gym",
            description: "Go to gym at 5 PM",
            id: i + 1,
        });
    }
    createTaskElements(tasks);
}
(_a = document
    .getElementById("generateButtonStage1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateRandomTasksStage1);
generateRandomTasksStage1();
