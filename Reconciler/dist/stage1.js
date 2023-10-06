"use strict";
var _a;
const tasks = [];
// Creates and displays DOM elements for tasks.
const createTaskElements = (taskData) => {
    const taskContainer = document.getElementById("stage1");
    if (!taskContainer) {
        console.error("Task container not found.");
        return;
    }
    taskContainer.innerHTML = ""; // Clear existing tasks.
    let tasksAdded = 0;
    taskData.forEach((item) => {
        tasksAdded++;
        const taskElement = document.createElement("div");
        taskElement.dataset.id = item.id.toString();
        const titleElement = document.createElement("span");
        titleElement.textContent = item.title;
        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = item.description;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTodoInStag1(item.id));
        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(deleteButton);
        taskContainer.appendChild(taskElement);
    });
    console.log(`Tasks added: ${tasksAdded}`);
};
// Generates random tasks and displays them using the createTaskElements function.
const generateRandomTasksStage1 = () => {
    for (let i = 0; i < Math.floor(Math.random() * 15); i++) {
        tasks.push({
            title: "Go to gym",
            description: "Go to gym at 5 PM",
            id: tasks.length + 1, // Assign a unique ID.
        });
    }
    createTaskElements(tasks);
};
// Delete a task by ID.
const deleteTodoInStag1 = (id) => {
    const indexToDelete = tasks.findIndex((task) => task.id === id);
    if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);
        createTaskElements(tasks);
        console.log(`Deleted task with ID ${id}`);
    }
};
(_a = document
    .getElementById("generateButtonStage1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateRandomTasksStage1);
generateRandomTasksStage1();
