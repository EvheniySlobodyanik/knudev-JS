import { checkForParameter } from "./validation.js";
import { processPostRequest } from "./store.js";

const buttonAdd = document.getElementById("add-product");

const formAdd = document.getElementById("form-add");
const closeForm = document.getElementById("close-form");
const buttonSubmit = document.getElementById("submit-form");

const inputImage = document.getElementById("input-image");
const inputTitle = document.getElementById("input-title");
const textareaDescription = document.getElementById("textarea-description");
const inputRate = document.getElementById("input-rate");
const inputRateCount = document.getElementById("input-rate-count");
const inputPrice = document.getElementById("input-price");

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

function showSingleProduct(data) {
  const container = createBlock("product-block", productsSection);

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

buttonAdd.addEventListener("click", () => {
  buttonAdd.style.display = "none";
  formAdd.style.display = "flex";
});

closeForm.addEventListener("click", () => {
  formAdd.style.display = "none";
  buttonAdd.style.display = "block";
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
