import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { addOptionToSelect } from "./dom-manipulation.js";

const productsErrorContainer = document.getElementById(
  "product-error-container"
);

const selectManage = document.getElementById("select-products");

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
    addOptionToSelect([data], "select-option", selectManage);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    createErrorMessage(
      `Something went wrong creating NEW product: ${error.message}`,
      productsErrorContainer
    );
  }
}

export async function processPutRequest(dataProduct, productId) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataProduct),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      createErrorMessage("Error updating the product!", productsErrorContainer);
      return;
    }

    console.log("Fetched products:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    createErrorMessage(
      `Something went wrong updating existing product: ${error.message}`,
      productsErrorContainer
    );
  }
}
