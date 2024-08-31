export function createElementWithClass(el, ...classes) {
  const element = document.createElement(`${el}`);
  for (const cl of classes) {
    element.classList.add(`${cl}`)
  };
  return element;
};

export function removeAllChilds(element) {
  while (element.firstChild) { 
    element.removeChild(element.lastChild);
  };
}
