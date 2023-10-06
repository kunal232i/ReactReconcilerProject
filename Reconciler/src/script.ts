const changeScriptSource = (stage: number): void => {
  console.log(`Changing script for Stage ${stage}`);

  const oldScript = document.getElementById("dynamicScript");
  if (oldScript) {
    oldScript.parentNode?.removeChild(oldScript);
  }

  const newScript = document.createElement("script");
  newScript.id = "dynamicScript";
  newScript.src = `Reconciler/dist/stage${stage}.js`;

  document.head.appendChild(newScript);
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stage1Button")?.addEventListener("click", () => {
    changeScriptSource(1);
  });

  document.getElementById("stage2Button")?.addEventListener("click", () => {
    changeScriptSource(2);
  });

  document.getElementById("stage3Button")?.addEventListener("click", () => {
    changeScriptSource(3);
  });
});
