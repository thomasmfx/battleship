export function newElementWithClass(el, text, ...classes) {
  const element = document.createElement(`${el}`);
  element.textContent = text;
  for (const cl of classes) {
    element.classList.add(`${cl}`)
  };
  return element;
};
