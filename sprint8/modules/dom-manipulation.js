const productsSection = document.getElementById("products");

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
}

function showSingleProduct(data) {
  const image = data.image;
  const title = data.title;
  const price = data.price;

  const container = createBlock("product-block", productsSection);

  createImage("product-image", image, title, container);
  createPara("product-title", title, container);
  createPara("product-price", `$${price}`, container);
}

function showProductsList(data) {
  data.forEach((element) => {
    console.log("We`re here!");
    showSingleProduct(element);
  });
}

export function StartChangingDOM(data) {
  showProductsList(data);
}
