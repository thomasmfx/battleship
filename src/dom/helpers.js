export function createElementWithClass(el, ...classes) {
  const element = document.createElement(`${el}`);
  for (const cl of classes) {
    element.classList.add(`${cl}`)
  };
  return element;
};
