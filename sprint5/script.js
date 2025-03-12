const images = [
  "cheetah",
  "chimpanzee",
  "fox",
  "giraffe",
  "lemur",
  "lion",
  "penguin",
  "rhino",
  "wolf",
];

const imgContainer = document.getElementById("image-container");

function createImg(name) {
  const img = document.createElement("img");
  img.src = `images/${name}.jpg`;
  img.tabIndex = 0;
  img.classList.add("image");
  imgContainer.appendChild(img);
}

images.forEach((el) => {
  createImg(el);
});
