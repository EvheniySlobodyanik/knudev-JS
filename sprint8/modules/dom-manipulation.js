import { checkForParameter } from "./validation.js";

import { startStore } from "./store.js";

const header = document.querySelector(".header");
const main = document.querySelector(".main");

const buttonAdd = document.getElementById("add-product");

const buttonsContainer = document.getElementById("buttons-container");
const buttonChange = document.getElementById("change");
const buttonDelete = document.getElementById("delete");

const formAdd = document.getElementById("form-add");
const closeForm = document.getElementById("close-form");
const buttonSubmit = document.getElementById("submit-form");

const formManage = document.querySelector(".form-change-delete");
const closeFormManage = document.getElementById("close-form-manage");
const buttonSubmitManage = document.getElementById("button-manage");

const inputImage = document.getElementById("input-image");
const inputTitle = document.getElementById("input-title");
const textareaDescription = document.getElementById("textarea-description");
const inputRate = document.getElementById("input-rate");
const inputRateCount = document.getElementById("input-rate-count");
const inputPrice = document.getElementById("input-price");

const fieldsetChangeImage = document.getElementById("fieldset-change-image");
const fieldsetChangeDetails = document.getElementById(
  "fieldset-change-details"
);
const buttonManageDelete = document.getElementById("manage-delete");

const selectManage = document.getElementById("select-products");
const inputChangeImage = document.getElementById("input-change-image");
const inputChangeTitle = document.getElementById("input-change-title");
const textareaChangeDescription = document.getElementById(
  "textarea-change-description"
);
const inputChangeRate = document.getElementById("input-change-rate");
const inputChangeRateCount = document.getElementById("input-change-rate-count");
const inputChangePrice = document.getElementById("input-change-price");

const productsSection = document.getElementById("products");
const productsLoaderContainer = document.getElementById(
  "product-loader-container"
);
const productErrorContainer = document.getElementById(
  "product-error-container"
);

const containerModal = document.getElementById("modal-container");

let currentProducts = [];

const errorSideContainer = document.getElementById("server-client-error");

function createPara(className, text, parent) {
  const para = document.createElement("p");
  para.classList.add(className);
  para.textContent = text;
  parent.appendChild(para);
  return para;
}

function createBlock(className, parent) {
  const div = document.createElement("div");
  div.classList.add(className);
  parent.appendChild(div);
  return div;
}

function createImage(className, src, alt, parent) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  img.alt = alt;
  parent.appendChild(img);
  return img;
}

// function createButton(className, text, parent) {
//   const btn = document.createElement("button");
//   btn.classList.add(className);
//   btn.textContent = text;
//   parent.appendChild(btn);
//   return btn;
// }

export function addOptionToSelect(array, className, parent) {
  array.forEach((item) => {
    const option = document.createElement("option");
    option.classList.add(className);
    option.textContent = item.title;
    option.value = item.id;
    parent.appendChild(option);
  });
}

export function removeOptionFromSelect(selectedId, parent) {
  const options = parent.querySelectorAll("option");
  options.forEach((option) => {
    if (option.value === selectedId) {
      parent.removeChild(option);
    }
  });
}

function showSingleProduct(data) {
  const container = createBlock("product-block", productsSection);
  container.setAttribute("id", data.id);

  createImage("product-image", data.image, data.title, container);
  createPara("product-title", data.title, container);
  createPara("product-price", `$${data.price}`, container);

  container.addEventListener("click", () => {
    containerModal.style.display = "block";
    showModalBox(data);
  });
}

function showModalBox(data) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  modalHeader.replaceChildren();
  modalBody.replaceChildren();
  modalFooter.replaceChildren();

  const span = document.createElement("span");
  span.innerHTML = "&times;";
  span.classList.add("close");

  createPara("modal-product-title", data.title, modalHeader);
  modalHeader.appendChild(span);
  createPara("product-description", data.description, modalBody);
  createPara("product-rating-rate", `Rating: ${data.rating.rate}`, modalBody);
  createPara(
    "product-rating-count",
    `Rating count: ${data.rating.count}`,
    modalBody
  );
  createPara("product-price", `$${data.price}`, modalFooter);

  span.onclick = function () {
    containerModal.style.display = "none";
  };

  window.addEventListener("click", (event) => {
    if (event.target == containerModal) {
      containerModal.style.display = "none";
    }
  });
}

function showProductsList(data) {
  productsSection.replaceChildren();
  data.forEach((element) => {
    showSingleProduct(element);
  });
  productsLoaderContainer.remove();
  buttonAdd.style.display = "block";
  buttonsContainer.style.display = "flex";
}

export function removeErrorMessage() {
  const errorBlock = document.querySelector(".error-message");
  if (errorBlock) {
    errorBlock.remove();
  }
}

export function createErrorMessage(text, parent) {
  if (!parent) {
    console.warn("Error message parent element not found.");
    return;
  }

  removeErrorMessage();

  const errorMsg = document.createElement("p");
  errorMsg.classList.add("error-message");
  errorMsg.textContent = text;
  parent.appendChild(errorMsg);
}

export function startChangingDOM(data) {
  currentProducts = [...data];

  showProductsList(currentProducts);

  selectManage.replaceChildren();
  addOptionToSelect(currentProducts, "option-style", selectManage);
  fillFormWithInfo(currentProducts);

  selectManage.addEventListener("change", () => {
    fillFormWithInfo(currentProducts);
  });
}

function addProductManually(data) {
  const container = createBlock("product-block", productsSection);
  createImage("product-image", data.image, data.title, container);
  createPara("product-title", data.title, container);
  createPara("product-price", `$${data.price}`, container);

  container.addEventListener("click", () => {
    containerModal.style.display = "block";
    showModalBox(data);
  });

  return container;
}

function fillFormWithInfo(data) {
  let selectedId = Number(selectManage.value);

  const product = data.find((item) => item.id === selectedId);

  if (product) {
    //Due to security reasons we can`t give input type="file" src back :(
    // inputChangeImage.src = product.image;
    inputChangeTitle.value = product.title;
    textareaChangeDescription.value = product.description;
    inputChangePrice.value = product.price;
    inputChangeRate.value = product.rating?.rate ?? "";
    inputChangeRateCount.value = product.rating?.count ?? "";
  }
}

function fillSelectedProduct(data, selectedId) {
  const product = document.getElementById(selectedId);
  if (!product) return;

  product.replaceChildren();

  createImage("product-image", data.image, inputChangeTitle.value, product);
  createPara("product-title", inputChangeTitle.value, product);
  createPara("product-price", `$${inputChangePrice.value}`, product);

  product.addEventListener("click", () => {
    containerModal.style.display = "block";
    showModalBox(data);
  });
}

export function updateProductInDOM(updatedProduct) {
  const productCard = document.querySelector(
    `[data-product-id="${updatedProduct.id}"]`
  );

  //without this leads to error
  if (!productCard) {
    console.warn(`Product with ID ${updatedProduct.id} not found in DOM.`);
    return;
  }

  productCard.querySelector(".product-title").textContent =
    updatedProduct.title;
  productCard.querySelector(
    ".product-price"
  ).textContent = `$${updatedProduct.price}`;
  productCard.querySelector(".product-description").textContent =
    updatedProduct.description;
  productCard.querySelector(".product-image").src = updatedProduct.image;
  productCard.querySelector(".product-rate").textContent =
    updatedProduct.rating?.rate ?? "";
  productCard.querySelector(".product-rate-count").textContent =
    updatedProduct.rating?.count ?? "";
}

function removeSelectedProduct(selectedId) {
  const product = document.getElementById(selectedId);
  if (!product) return;

  product.remove();
}

buttonAdd.addEventListener("click", () => {
  buttonAdd.style.display = "none";
  buttonsContainer.style.display = "none";
  formAdd.style.display = "flex";
});

buttonChange.addEventListener("click", () => {
  buttonSubmitManage.style.display = "block";
  buttonSubmitManage.textContent = "Change";

  buttonManageDelete.style.display = "none";

  fieldsetChangeDetails.style.display = "flex";
  fieldsetChangeImage.style.display = "flex";

  formManage.style.display = "flex";
  buttonAdd.style.display = "none";
  buttonsContainer.style.display = "none";
});

buttonDelete.addEventListener("click", () => {
  buttonSubmitManage.style.display = "none";

  buttonManageDelete.style.display = "block";

  fieldsetChangeDetails.style.display = "none";
  fieldsetChangeImage.style.display = "none";

  formManage.style.display = "flex";
  buttonAdd.style.display = "none";
  buttonsContainer.style.display = "none";
});

closeForm.addEventListener("click", () => {
  formAdd.style.display = "none";
  buttonAdd.style.display = "block";
  buttonsContainer.style.display = "flex";
});

closeFormManage.addEventListener("click", () => {
  formManage.style.display = "none";
  buttonAdd.style.display = "block";
  buttonsContainer.style.display = "flex";
});

buttonSubmit.addEventListener("click", async (event) => {
  event.preventDefault();

  if (
    checkForParameter(inputImage, "length") &&
    checkForParameter(inputTitle, "value") &&
    checkForParameter(textareaDescription, "value") &&
    checkForParameter(inputRate, "value") &&
    checkForParameter(inputRateCount, "value") &&
    checkForParameter(inputPrice, "value")
  ) {
    const id = Date.now();

    const data = {
      id,
      title: inputTitle.value,
      price: parseFloat(inputPrice.value),
      description: textareaDescription.value,
      rating: {
        rate: parseFloat(inputRate.value),
        count: parseInt(inputRateCount.value),
      },
      image: URL.createObjectURL(inputImage.files[0]),
    };

    const productElement = addProductManually(data);
    productElement.setAttribute("id", id);

    currentProducts.push(data);

    addOptionToSelect([data], "option-style", selectManage);
    selectManage.value = data.id;
    fillFormWithInfo(currentProducts);

    formAdd.reset();
    removeErrorMessage();
    formAdd.style.display = "none";
    buttonAdd.style.display = "block";
    buttonsContainer.style.display = "flex";

    try {
      await startStore("POST", data);
    } catch (error) {
      setTimeout(() => {
        if (productElement) productElement.remove();
        removeOptionFromSelect(data.id.toString(), selectManage);
        createErrorMessage(
          "Something went wrong creating the product...",
          productErrorContainer
        );
      }, 1000);
    }
  } else {
    createErrorMessage("All fields must contain value! + (0<Rate<5)", formAdd);
  }
});

buttonSubmitManage.addEventListener("click", async (event) => {
  event.preventDefault();
  if (
    checkForParameter(inputChangeImage, "length") &&
    checkForParameter(inputChangeTitle, "value") &&
    checkForParameter(textareaChangeDescription, "value") &&
    checkForParameter(inputChangeRate, "value") &&
    checkForParameter(inputChangeRateCount, "value") &&
    checkForParameter(inputChangePrice, "value")
  ) {
    const selectedId = Number(selectManage.value);

    const data = {
      title: inputChangeTitle.value,
      price: parseFloat(inputChangePrice.value),
      description: textareaChangeDescription.value,
      rating: {
        rate: parseFloat(inputChangeRate.value),
        count: parseInt(inputChangeRateCount.value),
      },
      image: URL.createObjectURL(inputChangeImage.files[0]),
    };

    const originalData = {
      id: selectedId,
      title: inputChangeTitle.defaultValue,
      price: parseFloat(inputChangePrice.defaultValue),
      description: textareaChangeDescription.defaultValue,
      rating: {
        rate: parseFloat(inputChangeRate.defaultValue),
        count: parseInt(inputChangeRateCount.defaultValue),
      },
      image: null,
    };

    fillSelectedProduct(data, selectedId);
    removeErrorMessage();
    buttonAdd.style.display = "block";
    formManage.style.display = "none";
    buttonsContainer.style.display = "flex";

    try {
      await startStore("PUT", data, selectedId);

      const index = currentProducts.findIndex((p) => p.id === selectedId);
      if (index !== -1) {
        currentProducts[index] = { ...data, id: selectedId };
      }

      selectManage.replaceChildren();
      addOptionToSelect(currentProducts, "option-style", selectManage);
      selectManage.value = selectedId;
      fillFormWithInfo(currentProducts);
    } catch (error) {
      setTimeout(() => {
        fillSelectedProduct(originalData, selectedId);
        createErrorMessage(
          "Something went wrong updating the product...",
          productErrorContainer
        );
      }, 1000);
    }
  } else {
    createErrorMessage(
      "All fields must contain value! + (0<Rate<5)",
      formManage
    );
  }
});

buttonManageDelete.addEventListener("click", async (event) => {
  event.preventDefault();

  if (checkForParameter(selectManage, "value")) {
    const selectedId = selectManage.value;
    const productElement = document.getElementById(selectedId);

    if (!productElement) return;

    const title = productElement.querySelector(".product-title")?.textContent;
    const priceText =
      productElement.querySelector(".product-price")?.textContent;
    const price = parseFloat(priceText.replace("$", ""));
    const imageSrc = productElement.querySelector(".product-image")?.src;

    const backupProduct = {
      id: selectedId,
      title,
      price,
      image: imageSrc,
      description: textareaChangeDescription.value,
      rating: {
        rate: parseFloat(inputChangeRate.value),
        count: parseInt(inputChangeRateCount.value),
      },
    };

    removeSelectedProduct(selectedId);
    removeErrorMessage();
    buttonAdd.style.display = "block";
    formManage.style.display = "none";
    buttonsContainer.style.display = "flex";

    try {
      await startStore("DELETE", "", selectedId);
      removeOptionFromSelect(selectedId, selectManage);
    } catch (error) {
      setTimeout(() => {
        addProductManually(backupProduct);
        createErrorMessage(
          "Something went wrong deleting the product...",
          productErrorContainer
        );
      }, 1000);
    }
  }
});

function hideEverything() {
  header.style.display = "none";
  buttonAdd.style.display = "none";
  buttonsContainer.style.display = "none";
  productsLoaderContainer.style.display = "none";
  main.style.display = "none";
}

export function handleErrors(errorName, errorMessage) {
  errorSideContainer.style.display = "flex";
  hideEverything();

  let imageSrc = "";
  let imageAlt = "";

  let title = "";
  let titleInfo = "";
  let paragraph = "";

  switch (errorName) {
    case 500:
      imageSrc = "images/for-errors/500.png";
      imageAlt = "dead-computer";

      title = "500";
      titleInfo = "Internal Server Error";
      paragraph = "Error occurred on the FakeStoreAPI side. Try again later!";

      break;
    case "NETWORK_ERROR":
      imageSrc = "images/for-errors/NETWORK_ERROR.png";
      imageAlt = "black wi-fi";

      title = "NETWORK_ERROR";
      titleInfo = errorMessage;
      paragraph = "Try again later!";

      break;
  }

  createImage("image", imageSrc, imageAlt, errorSideContainer);
  createPara("title", title, errorSideContainer);
  createPara("title-info", titleInfo, errorSideContainer);
  createPara("paragraph", paragraph, errorSideContainer);
}
