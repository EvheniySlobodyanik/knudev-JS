const images = [
  {
    src: "cheetah",
    alt: "a lightly built, spotted cat characterised by a small rounded head, a short snout, black tear-like facial streaks, a deep chest, long thin legs and a long tail",
    diet: "Carnivore / Predator",
    activity: "Daytime (Diurnal)",
  },
  {
    src: "chimpanzee",
    alt: "great ape covered in coarse black hair but has a bare face, fingers, toes, palms of the hands, and soles of the feet",
    diet: "Omnivore",
    activity: "Daytime (Diurnal)",
  },
  {
    src: "fox",
    alt: "dog-like appearance; reddish or greyish coat with lighter under fur; pointed ears and a snout with a black nose; long, bushy tail.",
    diet: "Omnivore / Predator",
    activity: "Nighttime (Nocturnal) & Twilight (Crepuscular)",
  },
  {
    src: "giraffe",
    alt: "the tallest of all mammals. It reaches an overall height of 18 ft (5.5 m) or more. The legs and neck are extremely long. The giraffe has a short body, a tufted tail, a short mane, and short skin-covered horns.",
    diet: "Herbivore",
    activity: "Daytime (Diurnal)",
  },
  {
    src: "lemur",
    alt: "generally small in size, and their face somewhat resembles a mouse's face in smaller species or a fox's face in larger species",
    diet: "Herbivore / Omnivore",
    activity: "Nighttime (Nocturnal) & Twilight (Crepuscular)",
  },
  {
    src: "lion",
    alt: "strong, compact bodies and powerful forelegs, teeth and jaws for pulling down and killing prey. Their coats are yellow-gold, and adult males have shaggy manes that range in color from blond to reddish-brown to black.",
    diet: "Carnivore / Apex Predator",
    activity: "Twilight (Crepuscular) & Nighttime (Nocturnal)",
  },
  {
    src: "penguin",
    alt: "Their body shape is fusiform (tapered at both ends) and streamlined, allowing them to be expert swimmers. They have a large head, short neck, and elongated body. Their tails are short, stiff, and wedge-shaped. Their legs and webbed feet are set far back on the body, which gives penguins their upright posture on land.",
    diet: "Carnivore (Fish, squid, krill)",
    activity: "Daytime (Diurnal)",
  },
  {
    src: "rhino",
    alt: "massive bodies, stumpy legs and either one or two dermal horns. In some species, the horns may be short or not obvious. They are renowned for having poor eyesight, but their senses of smell and hearing are well developed.",
    diet: "Herbivore",
    activity: "Daytime (Diurnal) & Twilight (Crepuscular)",
  },
  {
    src: "wolf",
    alt: "high body, long legs, broad skull tapering to a narrow muzzle. The tail is bushy and coat has a thick, dense underfur. Colors vary from light to dark gray with black and white interspersed, to some individuals being solid black and solid white.",
    diet: "Carnivore / Predator",
    activity: "Nighttime (Nocturnal) & Twilight (Crepuscular)",
  },
];

const filterElements = {
  diet: {
    button: document.getElementById("button-diet"),
    select: document.getElementById("select-diet"),
  },
  activity: {
    button: document.getElementById("button-activity"),
    select: document.getElementById("select-activity"),
  },
};

const gallery = document.getElementById("gallery");
let activeInfo = null;

function attachEvent(element, event, handler, options = {}) {
  element.addEventListener(`${event}`, handler, options);
}

function createModal(img, title, description, diet, activity) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  const _title = document.createElement("h2");
  _title.textContent = title;

  const _description = document.createElement("p");
  _description.textContent = description;

  const _diet = document.createElement("p");
  _diet.textContent = diet;

  const _activity = document.createElement("p");
  _activity.textContent = activity;

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  modalHeader.appendChild(closeBtn);
  modalHeader.appendChild(_title);
  modalBody.appendChild(_diet);
  modalBody.appendChild(_activity);
  modalBody.appendChild(_description);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);

  toggleClose(modal, closeBtn);
  toggleImage(img, modal);

  return modal;
}

function removeEnlarge() {
  document
    .querySelectorAll("img")
    .forEach((el) => el.classList.remove("image-enlarge"));
}

function enlargeImage(img) {
  removeEnlarge();

  img.classList.add("image-enlarge");
}

function toggleImage(img, modal) {
  attachEvent(img, "click", () => {
    enlargeImage(img);
    toggleModal(modal);
  });
  attachEvent(img, "keydown", (e) => {
    if (e.key === "Enter") {
      enlargeImage(img);
      toggleModal(modal);
    }
  });
}

function toggleModal(modal) {
  if (activeInfo && activeInfo !== modal) {
    activeInfo.style.display = "none";
  }

  if (modal.style.display === "none" || !modal.style.display) {
    modal.style.display = "block";
    activeInfo = modal;
  } else {
    modal.style.display = "none";
    activeInfo = null;
  }
}

function toggleClose(modal, closeBtn) {
  attachEvent(closeBtn, "click", () => {
    modal.style.display = "none";
    removeEnlarge();
  });

  attachEvent(window, "click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      removeEnlarge();
    }
  });
}

function createContainer(img, title, description, diet, activity) {
  const container = document.createElement("div");
  container.classList.add("container");

  const modal = createModal(img, title, description, diet, activity);
  container.appendChild(img);
  container.appendChild(modal);
  gallery.appendChild(container);
}

function createImg(name, description, diet, activity) {
  const img = document.createElement("img");
  img.src = `images/${name}.jpg`;
  img.alt = description;
  img.tabIndex = 0;
  img.classList.add("image");

  createContainer(img, name, description, diet, activity);
}

images.forEach(({ src, alt, diet, activity }) => {
  createImg(src, alt, diet, activity);
});

function filterImages(value) {
  const containers = gallery.querySelectorAll(".container");
  [...containers].forEach((container) => {
    const paragraphs = container.querySelectorAll("p");
    const match = [...paragraphs].some((p) => p.textContent.includes(value));

    if (match) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}

attachEvent(filterElements.diet.button, "click", () => {
  filterImages(filterElements.diet.select.value);
});

attachEvent(filterElements.activity.button, "click", () => {
  filterImages(filterElements.activity.select.value);
});
