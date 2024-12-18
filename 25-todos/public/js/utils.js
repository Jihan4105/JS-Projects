export function getElement(selector) {
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error (`Please check "${selector}," selector no such element exist`);
}

export function addMultiEventListener(element, eventNames, eventHandler) {
  eventNames.split(" ").forEach( e => element.addEventListener(e, eventHandler, false))
}
