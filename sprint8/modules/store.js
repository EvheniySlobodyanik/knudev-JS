import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";

export function startStore() {
  workWithStoreAPI();
}

async function workWithStoreAPI() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      createErrorMessage("No products found.");
      return;
    }

    console.log("Fetched products:", data);
    startChangingDOM(data);
  } catch (error) {
    console.error("Fetch error:", error);
    createErrorMessage(`Something went wrong: ${error.message}`);
  }
}
