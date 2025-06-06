import { startChangingDOM } from "./dom-manipulation.js";
import { createErrorMessage } from "./dom-manipulation.js";
import { addOptionToSelect } from "./dom-manipulation.js";
import { updateProductInDOM } from "./dom-manipulation.js";
import { handleErrors } from "./dom-manipulation.js";
import { removeProductFromDOM } from "./dom-manipulation.js";
import { manageCategoryFilter } from "./dom-manipulation.js";

import { cacheDataWithExpiration, getExpiringData } from "./local-storage.js";

const productsErrorContainer = document.getElementById(
  "product-error-container"
);

const selectManage = document.getElementById("select-products");

const buttonRefresh = document.getElementById("refresh");

export function startStore(method, dataProduct, productId) {
  switch (method) {
    case "GET":
      const cachedProducts = getExpiringData("products");
      const cachedCategories = getExpiringData("categories");

      if (cachedProducts && cachedCategories) {
        console.log("Using cached data");
        startChangingDOM(cachedProducts);
        manageCategoryFilter(cachedCategories);
        return;
      }

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

//simulating error
// handleErrors(500);

async function workWithStoreAPI(URL, options, method, id) {
  const categoriesURL = "https://fakestoreapi.com/products/categories";

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(URL, options),
      fetch(categoriesURL),
    ]);

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
      cacheDataWithExpiration("products", productData, 600);
      cacheDataWithExpiration("categories", categoriesData, 600);

      console.log("CACHED products:", productData);
      console.log("CACHED categories:", categoriesData);
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

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/sprint8/sw.js",
        {
          scope: "/sprint8/",
        }
      );
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

buttonRefresh.addEventListener("click", () => {
  //if we wanna to reset timer(10 minute validity), optional
  // localStorage.removeItem("products");
  // localStorage.removeItem("categories");

  startStore("GET");
});
