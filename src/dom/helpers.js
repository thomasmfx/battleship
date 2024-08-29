export function newElementWithClass(el, ...classes) {
  const element = document.createElement(`${el}`);
  for (const cl of classes) {
    element.classList.add(`${cl}`)
  };
  return element;
};
