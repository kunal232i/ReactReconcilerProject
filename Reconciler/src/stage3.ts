interface TodoItem {
  id: number;
  title: string;
  description: string;
}

let virtualDOM: TodoItem[] = [];

// Create a container for the console logs
const logsContainerStage3: HTMLDivElement = document.createElement("div");
logsContainerStage3.id = "logsContainerStage3";
const stage3Element: HTMLElement | null = document.getElementById("stage3");
if (stage3Element) {
  stage3Element.appendChild(logsContainerStage3);
}

function createDOMElements(
  existingDOM: TodoItem[],
  currentDOM: TodoItem[],
  startTime: number
): void {
  const parentElement: HTMLElement | null = document.getElementById("stage3");

  let addedCount: number = 0,
    deletedCount: number = 0,
    updatedCount: number = 0;

  // Compare the new virtual DOM to the old virtual DOM
  currentDOM.forEach((item) => {
    const existingItem: TodoItem | undefined = existingDOM.find(
      (oldItem) => oldItem.id === item.id
    );

    if (existingItem) {
      updatedCount++;
      const existingChild: HTMLElement | null = document.querySelector(
        `[data-id='${item.id}']`
      );
      if (existingChild) {
        existingChild.children[0].innerHTML = item.title;
        existingChild.children[1].innerHTML = item.description;
      }
    } else {
      addedCount++;
      const childElement: HTMLDivElement = document.createElement("div");
      childElement.dataset.id = item.id.toString();

      const grandChildElement1: HTMLSpanElement =
        document.createElement("span");
      grandChildElement1.innerHTML = item.title;

      const grandChildElement2: HTMLSpanElement =
        document.createElement("span");
      grandChildElement2.innerHTML = item.description;

      const grandChildElement3: HTMLButtonElement =
        document.createElement("button");
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
      const childToRemove: HTMLElement | null = document.querySelector(
        `[data-id='${oldItem.id}']`
      );
      if (parentElement && childToRemove) {
        parentElement.removeChild(childToRemove);
      }
    }
  });

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime) * 1000; // Convert to microseconds

  // Display the total time within logsContainerStage3
  logsContainerStage3.innerHTML = `
    <div>Added: ${addedCount}</div>
    <div>Updated: ${updatedCount}</div>
    <div>Deleted: ${deletedCount}</div>
    <div>Total time taken: ${elapsedTime.toFixed(2)} µs</div>
  `;
}

function updateVirtualDOM(data: TodoItem[]): void {
  const existingDOM: TodoItem[] = [...virtualDOM]; // Save the existing state of virtualDOM
  virtualDOM = data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));
  createDOMElements(existingDOM, virtualDOM, performance.now()); // Pass the old and new virtualDOM and start time
}

function generateRandomTasksStage3(): void {
  const startTime = performance.now();

  const todos: TodoItem[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    todos.push({
      title: "Go to gym",
      description: "Go to gym from 5",
      id: i + 1,
    });
  }
  updateVirtualDOM(todos);
}

const generateButtonStage3: HTMLElement | null = document.getElementById(
  "generateButtonStage3"
);
if (generateButtonStage3) {
  generateButtonStage3.addEventListener("click", generateRandomTasksStage3);
}

generateRandomTasksStage3();

// delete the todo
function deleteTodo(id: number): void {
  const indexToRemove = virtualDOM.findIndex((item) => item.id === id);
  if (indexToRemove !== -1) {
    virtualDOM.splice(indexToRemove, 1);
    updateVirtualDOM(virtualDOM); // Update the DOM after removing the item

    const elementToRemove: HTMLElement | null = document.querySelector(
      `[data-id='${id}']`
    );
    if (elementToRemove && elementToRemove.parentNode) {
      elementToRemove.parentNode.removeChild(elementToRemove);
    }
  }
}
