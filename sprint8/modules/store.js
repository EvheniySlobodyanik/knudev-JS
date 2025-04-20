import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { addOptionToSelect } from "./dom-manipulation.js";
import { updateProductInDOM } from "./dom-manipulation.js";

const productsErrorContainer = document.getElementById(
  "product-error-container"
);

const selectManage = document.getElementById("select-products");

export function startStore(method, dataProduct, productId) {
  switch (method) {
    case "GET":
      workWithStoreAPI(
        "https://fakestoreapi.com/products",
        { method: method },
        method
      );
      break;
    case "POST":
      workWithStoreAPI(
        "https://fakestoreapi.com/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataProduct),
        },
        method
      );
      break;
    case "PUT":
      workWithStoreAPI(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataProduct),
        },
        method
      );
      break;
    case "DELETE":
      workWithStoreAPI(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "DELETE",
        },
        method
      );
  }
}

async function workWithStoreAPI(URL, options, method) {
  // //error simulating
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // throw new Error("Simulated network error for testing");

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      createErrorMessage("No products found.");
      return;
    }

    console.log(`Fetched products(${method}):`, data);

    if (method === "POST") {
      addOptionToSelect([data], "select-option", selectManage);
    } else if (method === "PUT") {
      updateProductInDOM(data);
    } else if (method === "GET") {
      startChangingDOM(data);
    }
    return data;
  } catch (error) {
    console.error("Fetch error:", error);

    let errorMessage = "";

    switch (method) {
      case "GET":
        errorMessage = "Something went wrong in process of getting products";
        break;
      case "POST":
        errorMessage =
          "Something went wrong in process of creating NEW product";
        break;
      case "PUT":
        errorMessage =
          "Something went wrong in process of updating EXISTING product";
        break;
      case "DELETE":
        errorMessage =
          "Something went wrong in process of deleting EXISTING product";
        break;
    }

    createErrorMessage(
      `${errorMessage}: ${error.message}`,
      productsErrorContainer
    );
  }
}
