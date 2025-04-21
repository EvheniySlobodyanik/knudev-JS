import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { addOptionToSelect } from "./dom-manipulation.js";
import { updateProductInDOM } from "./dom-manipulation.js";
import { handleErrors } from "./dom-manipulation.js";
import { removeProductFromDOM } from "./dom-manipulation.js";
import { manageCategoryFilter } from "./dom-manipulation.js";

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
          headers: { "Content-Type": "application/json" },
        },
        method,
        productId
      );
  }
}

async function workWithStoreAPI(URL, options, method, id) {
  const categoriesURL = "https://fakestoreapi.com/products/categories";

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(URL, options),
      fetch(categoriesURL),
    ]);

    // const response = await fetch(URL, options);

    if (!productsRes.ok) {
      handleErrors(productsRes.status);
      throw new Error("Network response was not ok");
    }
    if (!categoriesRes.ok) {
      handleErrors(categoriesRes.status);
      throw new Error("Network response was not ok");
    }

    const [productData, categoriesData] = await Promise.all([
      productsRes.json(),
      categoriesRes.json(),
    ]);

    if (!productData || productData.length === 0) {
      createErrorMessage("No products found.");
      return;
    } else if (!categoriesData || categoriesData.length === 0) {
      createErrorMessage("No categories found.");
      return;
    }

    const categories = [...new Set(categoriesData)];

    console.log(`Fetched products(${method}):`, productData);
    console.log(`Fetched product categories: `, categoriesData);

    if (method === "POST") {
      addOptionToSelect([productData], "select-option", selectManage);
    } else if (method === "PUT") {
      updateProductInDOM(productData);
    } else if (method === "GET") {
      startChangingDOM(productData);
    } else if (method === "DELETE") {
      removeProductFromDOM(id);
    }

    manageCategoryFilter(categories);
    return productData;
  } catch (error) {
    console.error("Fetch error:", error);

    if (error.message === "Failed to fetch" || error instanceof TypeError) {
      handleErrors("NETWORK_ERROR", error.message);
    }

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
