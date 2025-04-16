import { StartStore } from "./modules/store.js";

let userConfirmed = false;

while (!userConfirmed) {
  userConfirmed = confirm("Wanna see product catalog?");
}
StartStore();
