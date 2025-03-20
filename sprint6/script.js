import { handleQuiz } from "./modules/dom-manipulation.js";
import { startNextRound } from "./modules/dom-manipulation.js";

export function handleEvent(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
}

handleEvent(document.getElementById("start"), "click", () => {
  handleQuiz();
});

handleEvent(document.getElementById("next"), "click", () => {
  startNextRound(true);
});
