"use strict";
let virtualDOM = [];
// Create a container for the console logs
const logsContainerStage3 = document.createElement("div");
logsContainerStage3.id = "logsContainerStage3";
const stage3Element = document.getElementById("stage3");
if (stage3Element) {
    stage3Element.appendChild(logsContainerStage3);
}
function createDOMElements(existingDOM, currentDOM) {
    const parentElement = document.getElementById("stage3");
    let addedCount = 0, deletedCount = 0, updatedCount = 0;
    // Compare the new virtual DOM to the old virtual DOM
    currentDOM.forEach((item) => {
        const existingItem = existingDOM.find((oldItem) => oldItem.id === item.id);
        if (existingItem) {
            updatedCount++;
            const existingChild = document.querySelector(`[data-id='${item.id}']`);
            if (existingChild) {
                existingChild.children[0].innerHTML = item.title;
                existingChild.children[1].innerHTML = item.description;
            }
        }
        else {
            addedCount++;
            const childElement = document.createElement("div");
            childElement.dataset.id = item.id.toString();
            const grandChildElement1 = document.createElement("span");
            grandChildElement1.innerHTML = item.title;
            const grandChildElement2 = document.createElement("span");
            grandChildElement2.innerHTML = item.description;
            const grandChildElement3 = document.createElement("button");
            grandChildElement3.innerHTML = "Delete";
            grandChildElement3.onclick = () => deleteTodo(item.id);
            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            if (parentElement) {
                parentElement.appendChild(childElement);
            }
        }
    });
    // Any item left in the existingDOM array no longer exists in the data, so remove them
    existingDOM.forEach((oldItem) => {
        if (!currentDOM.some((item) => item.id === oldItem.id)) {
            deletedCount++;
            const childToRemove = document.querySelector(`[data-id='${oldItem.id}']`);
            if (parentElement && childToRemove) {
                parentElement.removeChild(childToRemove);
            }
        }
    });
    logsContainerStage3.innerHTML = `
    <div>Added: ${addedCount}</div>
    <div>Updated: ${updatedCount}</div>
    <div>Deleted: ${deletedCount}</div>
  `;
}
function updateVirtualDOM(data) {
    const existingDOM = [...virtualDOM]; // Save the existing state of virtualDOM
    virtualDOM = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
    }));
    createDOMElements(existingDOM, virtualDOM); // Pass the old and new virtualDOM to
}
function generateRandomTasksStage3() {
    const todos = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        todos.push({
            title: "Go to gym",
            description: "Go to gym from 5",
            id: i + 1,
        });
    }
    updateVirtualDOM(todos);
}
const generateButtonStage3 = document.getElementById("generateButtonStage3");
if (generateButtonStage3) {
    generateButtonStage3.addEventListener("click", generateRandomTasksStage3);
}
generateRandomTasksStage3();
// delete the todo
function deleteTodo(id) {
    const indexToRemove = virtualDOM.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
        virtualDOM.splice(indexToRemove, 1);
        updateVirtualDOM(virtualDOM); // Update the DOM after removing the item
        const elementToRemove = document.querySelector(`[data-id='${id}']`);
        if (elementToRemove && elementToRemove.parentNode) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        }
    }
}
