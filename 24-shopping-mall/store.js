import { getStorageItem, setStorageItem } from "./src/utils.js";

let store = getStorageItem("store")

const setupStore = (products) => {
  setStorageItem("store", products)
}

const findProduct = (id) => {
  let product = store.find((product) => product.id === id)
  return product
}

export {store, setupStore, findProduct}