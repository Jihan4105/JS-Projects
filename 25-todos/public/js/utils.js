export function getElement(selector) {
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error (`Please check "${selector}," selector no such element exist`);
}

export function addMultiEventListener(element, eventNames, eventHandler) {
  eventNames.split(" ").forEach( e => element.addEventListener(e, eventHandler, false))
}

export function searchStringToObject(url) {
  const searchString = url.search.substring(1);

  // UrlSearchString을 Object로 변환 시켜준다.
  return JSON.parse(
    '{"' + searchString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
}