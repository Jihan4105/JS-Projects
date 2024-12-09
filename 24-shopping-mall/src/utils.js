const singleProductUrl = "https://www.course-api.com/javascript-store-single-product"

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

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item)

  if(storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item))
  } else {
    storageItem = []
  }
  return storageItem
}

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export {
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}