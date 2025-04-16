import { StartChangingDOM } from "./dom-manipulation.js";

export function StartStore() {
  WorkWithStoreAPI();
}

function WorkWithStoreAPI() {
  try {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data);
        StartChangingDOM(data);
      });
  } catch {
    console.error("Fetch error:", error);
  }
}
