const changeScriptSource = (stage: number): void => {
  console.log(`Changing script for Stage ${stage}`);
  const oldScript = document.getElementById("dynamicScript");
  if (oldScript) {
    oldScript.parentNode?.removeChild(oldScript);
  }

  // Clear the contents of all stage divs except the one for the clicked stage
  const stageContainers = document.querySelectorAll(".stage-container");
  stageContainers.forEach((container, index) => {
    const stageDiv = container.querySelector(".stage");
    if (stageDiv) {
      if (index + 1 !== stage) {
        stageDiv.innerHTML = "";
      }
    }
  });

  const newScript = document.createElement("script");
  newScript.id = "dynamicScript";
  newScript.src = `Reconciler/dist/stage${stage}.js`;

  document.head.appendChild(newScript);
};

document.addEventListener("DOMContentLoaded", () => {
  const stageButtons = document.querySelectorAll(".stage-button");
  stageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      changeScriptSource(index + 1);
    });
  });
});
