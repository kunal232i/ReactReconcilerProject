"use strict";
const changeScriptSource = (stage) => {
    var _a;
    console.log(`Changing script for Stage ${stage}`);
    const oldScript = document.getElementById("dynamicScript");
    if (oldScript) {
        (_a = oldScript.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(oldScript);
    }
    const newScript = document.createElement("script");
    newScript.id = "dynamicScript";
    newScript.src = `Reconciler/dist/stage${stage}.js`;
    document.head.appendChild(newScript);
};
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c;
    (_a = document.getElementById("stage1Button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        changeScriptSource(1);
    });
    (_b = document.getElementById("stage2Button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        changeScriptSource(2);
    });
    (_c = document.getElementById("stage3Button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        changeScriptSource(3);
    });
});
