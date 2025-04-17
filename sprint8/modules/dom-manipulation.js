import { checkForParameter } from "./validation.js";
import { processPostRequest } from "./store.js";
import { processPutRequest } from "./store.js";

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

export function addOptionToSelect(array, className, parent) {
  array.forEach((item) => {
    const option = document.createElement("option");
    option.classList.add(className);
    option.textContent = item.title;
    option.value = item.id;
    parent.appendChild(option);
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

export function createErrorMessage(text, parent) {
  const errorBlock = document.querySelector(".error-message");
  if (errorBlock) {
    errorBlock.remove();
  }

  const errorMsg = document.createElement("p");
  errorMsg.classList.add("error-message");
  errorMsg.textContent = text;
  parent.appendChild(errorMsg);
}

export function startChangingDOM(data) {
  showProductsList(data);

  selectManage.replaceChildren();
  addOptionToSelect(data, "option-style", selectManage);
  fillFormWithInfo(data);

  selectManage.addEventListener("change", () => {
    fillFormWithInfo(data);
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

buttonAdd.addEventListener("click", () => {
  buttonAdd.style.display = "none";
  buttonsContainer.style.display = "none";
  formAdd.style.display = "flex";
});

buttonChange.addEventListener("click", () => {
  buttonSubmitManage.textContent = "Change";
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
    const data = {
      title: inputTitle.value,
      price: parseFloat(inputPrice.value),
      description: textareaDescription.value,
      rating: {
        rate: parseFloat(inputRate.value),
        count: parseInt(inputRateCount.value),
      },
      image: URL.createObjectURL(inputImage.files[0]),
    };

    formAdd.reset();
    formAdd.style.display = "none";
    buttonAdd.style.display = "block";
    buttonsContainer.style.display = "flex";

    const productElement = addProductManually(data);

    try {
      await processPostRequest(data);
    } catch (error) {
      //optimistic change will feel more 'realistic' with delay
      setTimeout(() => {
        if (productElement) productElement.remove();
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
    buttonAdd.style.display = "block";
    formManage.style.display = "none";
    buttonsContainer.style.display = "flex";

    try {
      await processPutRequest(data, selectedId);
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
