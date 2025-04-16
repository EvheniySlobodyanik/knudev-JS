const productsSection = document.getElementById("products");
const productsLoaderContainer = document.getElementById(
  "product-loader-container"
);
const productsErrorContainer = document.getElementById(
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

// function createAnyElement(element, className, text, parent)
// {
//   const el = document.createElement(element);
//   el.classList.add(className);
//   el.tex
// }

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
}

export function createErrorMessage(text) {
  const errorBlock = document.querySelector(".error-message");
  if (errorBlock) {
    errorBlock.remove();
  }

  const errorMsg = document.createElement("p");
  errorMsg.classList.add("error-message");
  errorMsg.textContent = text;
  productsErrorContainer.appendChild(errorMsg);
}

export function startChangingDOM(data) {
  showProductsList(data);
}
