"use strict";
var _a;
// Create a container for the console logs
const logsContainerStage2 = document.createElement("div");
logsContainerStage2.id = "logsContainerStage2";
const stage2Element = document.getElementById("stage2");
if (stage2Element) {
    stage2Element.appendChild(logsContainerStage2);
}
function createDomElements(data, startTime) {
    const parentElement = document.getElementById("stage2");
    if (!parentElement) {
        console.error("Parent element not found.");
        return;
    }
    const currentChildren = Array.from(parentElement.children);
    const childrenToRemove = [];
    let added = 0, deleted = 0, updated = 0;
    data.forEach((item) => {
        const existingChild = currentChildren.find((child) => {
            if (child instanceof HTMLElement) {
                return child.dataset.id === String(item.id);
            }
            return false;
        });
        if (existingChild) {
            updated++;
            existingChild.children[0].innerHTML = item.title;
            existingChild.children[1].innerHTML = item.description;
            childrenToRemove.push(existingChild);
        }
        else {
            added++;
            const childElement = document.createElement("div");
            childElement.dataset.id = item.id.toString();
            const grandChildElement1 = document.createElement("span");
            grandChildElement1.innerHTML = item.title;
            const grandChildElement2 = document.createElement("span");
            grandChildElement2.innerHTML = item.description;
            const grandChildElement3 = document.createElement("button");
            grandChildElement3.innerHTML = "Delete";
            grandChildElement3.onclick = () => deleteTodoInStag2(item.id);
            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            parentElement.appendChild(childElement);
        }
    });
    // Remove elements marked for deletion
    childrenToRemove.forEach((child) => {
        deleted++;
        parentElement.removeChild(child);
    });
    const endTime = performance.now();
    const elapsedTime = (endTime - startTime) * 1000; // Convert to microseconds
    logsContainerStage2.innerHTML = `
  <div>Added: ${added}</div>
  <div>Updated: ${updated}</div>
  <div>Deleted: ${deleted}</div>
  <div>Total time taken: ${elapsedTime.toFixed(2)} µs</div>
  `;
}
function generateRandomTasksStage2() {
    const startTime = performance.now();
    const todos = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        todos.push({
            title: "Go to gym",
            description: "Go to gym from 5",
            id: i + 1,
        });
    }
    createDomElements(todos, startTime);
}
(_a = document
    .getElementById("generateButtonStage2")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateRandomTasksStage2);
generateRandomTasksStage2();
function deleteTodoInStag2(id) {
    const parentElement = document.getElementById("stage2");
    if (!parentElement) {
        console.error("Parent element not found.");
        return;
    }
    const elementToDelete = parentElement.querySelector(`[data-id="${id}"]`);
    if (elementToDelete) {
        parentElement.removeChild(elementToDelete);
        const logsContainer = document.getElementById("logsContainerStage2");
        if (logsContainer) {
            const deletedCountElement = logsContainer.querySelector('div:contains("Deleted:")');
            if (deletedCountElement &&
                deletedCountElement.textContent !== undefined) {
                const currentDeletedCount = parseInt(deletedCountElement.textContent.split(":")[1]) || 0;
                deletedCountElement.textContent = `Deleted: ${currentDeletedCount + 1}`;
            }
        }
    }
}
