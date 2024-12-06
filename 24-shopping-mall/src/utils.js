

const getElement = (selector) => {
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error (`Please check "${element}," selector no such element exist`);
}

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2))
  return formattedPrice;
}

export {
  getElement,
  formatPrice
}