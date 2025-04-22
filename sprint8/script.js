import { startStore } from "./modules/store.js";

let userConfirmed = false;

while (!userConfirmed) {
  userConfirmed = confirm("Wanna see product catalog?");
}
startStore("GET");

function updateOnlineStatus() {
  const banner = document.getElementById("offline-banner");
  if (!navigator.onLine) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }
}

updateOnlineStatus();

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
