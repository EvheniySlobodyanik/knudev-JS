import {
  createButton,
  createBlock,
  createPara,
  createImage,
} from "./dom-manipulation.js";

const cartBackdrop = document.getElementById("cart-backdrop");
const modalCart = document.getElementById("modal-cart");
const cartProducts = document.getElementById("cart-products");
const closeCart = document.getElementById("close-cart");
const moneyNumber = document.getElementById("money-number");
const buttonBuy = document.getElementById("buy");

let quantityHandlerSet = false;
let deleteHandlerSet = false;

export function handleCart() {
  setupCloseEvents();
  setupBuyEvent();
  setupQuantityHandlers();
  setupDeleteItem();
}

function setupCloseEvents() {
  closeCart.addEventListener("click", () => {
    modalCart.style.display = "none";
    cartBackdrop.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === cartBackdrop) {
      modalCart.style.display = "none";
      cartBackdrop.style.display = "none";
    }
  });
}

function setupBuyEvent() {
  buttonBuy.addEventListener("click", () => {
    cartProducts.replaceChildren();
    moneyNumber.textContent = "0$";
  });
}

document.addEventListener("click", function (event) {
  const addToCartBtn = event.target.closest(".add-to-cart");
  if (!addToCartBtn) return;

  const productBlock = addToCartBtn.closest(".product-block");
  if (!productBlock) return;

  const image = productBlock.querySelector(".product-image");
  const title = productBlock.querySelector(".product-title");
  const price = productBlock.querySelector(".product-price");

  if (!image || !title || !price) return;

  const cartObj = {
    imageSrc: image.src,
    imageAlt: image.alt,
    title: title.textContent,
    price: price.textContent,
  };

  const existingItem = [...cartProducts.querySelectorAll(".info-title")].find(
    (el) => el.textContent.trim() === cartObj.title.trim()
  );

  if (existingItem) {
    const cartItem = existingItem.closest(".cart-item");
    const input = cartItem.querySelector(".input-number-count");
    input.value = parseInt(input.value) + 1;

    const price = parseFloat(cartItem.dataset.price);
    updateTotalPrice(price);

    return;
  }

  createCartItem(cartObj);
});

function createCartItem(productObj) {
  const item = createBlock("cart-item", cartProducts);

  const numericPrice = parseFloat(productObj.price.replace(/[^\d.]/g, ""));
  item.dataset.price = numericPrice;

  const itemInfo = createBlock("item-info-container", item);
  const itemActions = createBlock("item-actions-container", item);

  createImage("info-image", productObj.imageSrc, productObj.imageAlt, itemInfo);
  createPara("info-title", productObj.title, itemInfo);
  createPara("info-price", productObj.price, itemInfo);

  const inputBlock = createBlock("actions-input-container", itemActions);
  const deleteBlock = createBlock("actions-delete-container", itemActions);

  const plusBtn = createButton("button-plus", "", inputBlock);
  createImage("plus-button-image", "images/for-cart/plus.png", "plus", plusBtn);

  const inputNumber = document.createElement("input");
  inputNumber.type = "number";
  inputNumber.classList.add("input-number-count");
  inputNumber.value = "1";
  inputNumber.disabled = true;
  inputBlock.appendChild(inputNumber);

  const minusBtn = createButton("button-minus", "", inputBlock);
  createImage(
    "minus-button-image",
    "images/for-cart/minus.png",
    "minus",
    minusBtn
  );

  const deleteBtn = createButton("button-cart-delete", "", deleteBlock);
  createImage(
    "delete-button-image",
    "images/for-cart/delete.png",
    "trash bucket",
    deleteBtn
  );

  updateTotalPrice(numericPrice);
}

function setupQuantityHandlers() {
  if (quantityHandlerSet) return;
  quantityHandlerSet = true;

  document.addEventListener("click", (event) => {
    const plusBtn = event.target.closest(".button-plus");
    const minusBtn = event.target.closest(".button-minus");

    if (!plusBtn && !minusBtn) return;

    const cartItem = event.target.closest(".cart-item");
    if (!cartItem) return;

    const input = cartItem.querySelector(".input-number-count");
    if (!input) return;

    let currentValue = parseInt(input.value);

    if (plusBtn) {
      input.value = currentValue + 1;
      const price = parseFloat(cartItem.dataset.price);
      updateTotalPrice(price);
    }

    if (minusBtn && currentValue > 1) {
      input.value = currentValue - 1;
      const price = parseFloat(cartItem.dataset.price);
      updateTotalPrice(-price);
    }
  });
}

function updateTotalPrice(amount) {
  const currentTotal = parseFloat(moneyNumber.textContent) || 0;
  moneyNumber.textContent = (currentTotal + amount).toFixed(2) + "$";
}

function setupDeleteItem() {
  if (deleteHandlerSet) return;
  deleteHandlerSet = true;

  document.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".button-cart-delete");
    if (!deleteBtn) return;

    const cartItem = event.target.closest(".cart-item");
    if (!cartItem) return;

    const itemPrice = parseFloat(cartItem.dataset.price);
    const itemCount = parseInt(
      cartItem.querySelector(".input-number-count").value
    );

    const total = itemPrice * itemCount;

    console.log("Current money:", moneyNumber.textContent);
    console.log("Item count:", itemCount);
    console.log("Item price:", itemPrice);
    console.log("Total to remove:", total);

    cartItem.remove();
    updateTotalPrice(-total);
  });
}

buttonBuy.addEventListener("click", () => {
  cartProducts.replaceChildren();
  moneyNumber.textContent = "0$";
});
