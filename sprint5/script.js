//array filled with object src(also title) and description to images
const images = [
  {
    src: "cheetah",
    alt: "a lightly built, spotted cat characterised by a small rounded head, a short snout, black tear-like facial streaks, a deep chest, long thin legs and a long tail",
  },
  {
    src: "chimpanzee",
    alt: "great ape covered in coarse black hair but has a bare face, fingers, toes, palms of the hands, and soles of the feet",
  },
  {
    src: "fox",
    alt: "dog-like appearance; reddish or greyish goat with lighter under fur; pointed ears and a snout with a black nose; long, bushy tail.",
  },
  {
    src: "giraffe",
    alt: "the tallest of all mammals. It reaches an overall height of 18 ft (5.5 m) or more. The legs and neck are extremely long. The giraffe has a short body, a tufted tail, a short mane, and short skin-covered horns.",
  },
  {
    src: "lemur",
    alt: "generally small in size, and their face somewhat resembles a mouse's face in smaller species or a fox's face in larger species",
  },
  {
    src: "lion",
    alt: "strong, compact bodies and powerful forelegs, teeth and jaws for pulling down and killing prey. Their coats are yellow-gold, and adult males have shaggy manes that range in color from blond to reddish-brown to black.",
  },
  {
    src: "penguin",
    alt: "Their body shape is fusiform (tapered at both ends) and streamlined, allowing them to be expert swimmers. They have a large head, short neck, and elongated body. Their tails are short, stiff, and wedge-shaped. Their legs and webbed feet are set far back on the body, which gives penguins their upright posture on land.",
  },
  {
    src: "rhino",
    alt: "massive bodies, stumpy legs and either one or two dermal horns. In some species, the horns may be short or not obvious. They are renowned for having poor eyesight, but their senses of smell and hearing are well developed.",
  },
  {
    src: "wolf",
    alt: "high body, long legs, broad skull tapering to a narrow muzzle. The tail is bushy and coat has a thick, dense underfur. Colors vary from light to dark gray with black and white interspersed, to some individuals being solid black and solid white.",
  },
];

//contains all images
const gallery = document.getElementById("gallery");

//currently displayed container info
let activeInfo = null;

//handles all events
function attachEvent(element, event, handler, options = {}) {
  element.addEventListener(`${event}`, handler, options);
}

//deletes 'transform' property from previous img and enlarges next one
function enlargeImage(img) {
  document
    .querySelectorAll("img")
    .forEach((el) => el.classList.remove("image-enlarge"));

  img.classList.add("image-enlarge");
}

//shows or hides info inside the existing container
function toggleAdditionalInformation(infoContainer) {
  if (activeInfo && activeInfo !== infoContainer) {
    activeInfo.style.display = "none";
  }

  //toggle visibility
  if (infoContainer.style.display === "none" || !infoContainer.style.display) {
    infoContainer.style.display = "block";
    activeInfo = infoContainer;
  } else {
    infoContainer.style.display = "none";
    activeInfo = null;
  }
}

//creates a container for the image and its info
function createContainer(img, title, description) {
  const container = document.createElement("div");
  container.classList.add("container-block");

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  infoContainer.style.display = "none";

  const _title = document.createElement("h2");
  _title.textContent = title;
  _title.classList.add("container-title");

  const _description = document.createElement("p");
  _description.textContent = description;

  infoContainer.appendChild(_title);
  infoContainer.appendChild(_description);

  container.appendChild(img);
  container.appendChild(infoContainer);
  gallery.appendChild(container);

  attachEvent(img, "click", () => {
    enlargeImage(img);
    toggleAdditionalInformation(infoContainer);
  });

  attachEvent(img, "keydown", (event) => {
    if (event.key === "Enter") {
      enlargeImage(img);
      toggleAdditionalInformation(infoContainer);
    }
  });
}

//creates imgs and catches some events based on it
function createImg(name, description) {
  const img = document.createElement("img");
  img.src = `images/${name}.jpg`;
  img.alt = description;
  img.tabIndex = 0;
  img.classList.add("image");
  createContainer(img, name, description);
}

//dynamically adds images to screen using function
images.forEach(({ src, alt }) => {
  createImg(src, alt);
});
