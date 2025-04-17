import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";

const productsErrorContainer = document.getElementById(
  "product-error-container"
);

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
    createErrorMessage(
      `Something went wrong: ${error.message}`,
      productsErrorContainer
    );
  }
}

export async function processPostRequest(dataProduct) {
  // //error simulating
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // throw new Error("Simulated network error for testing");

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataProduct),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      createErrorMessage(
        "Can`t create the EMPTY product!",
        productsErrorContainer
      );
      return;
    }

    console.log("Fetched products:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    createErrorMessage(
      `Something went wrong creating NEW product: ${error.message}`,
      productsErrorContainer
    );
  }
}
