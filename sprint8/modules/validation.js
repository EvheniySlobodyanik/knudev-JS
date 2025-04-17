export function checkForParameter(element, checked) {
  switch (checked) {
    case "value":
      if (
        element.value === null ||
        element.value === "" ||
        (typeof element.value === "number" && element.value < 0)
      ) {
        return false;
      } else {
        return true;
      }

    case "length":
      if (element.type === "file") {
        return element.files.length > 0;
      }
      return false;
  }
}
