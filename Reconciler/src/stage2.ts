interface TodoItem {
  id: number;
  title: string;
  description: string;
}

// Create a container for the console logs
const logsContainerStage2: HTMLDivElement = document.createElement("div");
logsContainerStage2.id = "logsContainerStage2";
const stage2Element: HTMLElement | null = document.getElementById("stage2");
if (stage2Element) {
  stage2Element.appendChild(logsContainerStage2);
}

function createDomElements(data: TodoItem[]): void {
  const parentElement = document.getElementById("stage2");

  if (!parentElement) {
    console.error("Parent element not found.");
    return;
  }

  const currentChildren = Array.from(parentElement.children);
  const childrenToRemove: Element[] = [];

  let added = 0,
    deleted = 0,
    updated = 0;

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
      childrenToRemove.push(existingChild); // Add it to the removal list
    } else {
      added++;
      const childElement = document.createElement("div");
      childElement.dataset.id = item.id.toString();

      const grandChildElement1 = document.createElement("span");
      grandChildElement1.innerHTML = item.title;

      const grandChildElement2 = document.createElement("span");
      grandChildElement2.innerHTML = item.description;

      const grandChildElement3 = document.createElement("button");
      grandChildElement3.innerHTML = "Delete";
      grandChildElement3.setAttribute("onclick", `deleteTodo(${item.id})`);

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

  logsContainerStage2.innerHTML = `
  <div>Added: ${added}</div>
  <div>Updated: ${updated}</div>
  <div>Deleted: ${deleted}</div>
  `;
}

function generateRandomTasksStage2(): void {
  const todos: TodoItem[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 15); i++) {
    todos.push({
      title: "Go to gym",
      description: "Go to gym from 5",
      id: i + 1,
    });
  }

  createDomElements(todos);
}

document
  .getElementById("generateButtonStage2")
  ?.addEventListener("click", generateRandomTasksStage2);

generateRandomTasksStage2();
