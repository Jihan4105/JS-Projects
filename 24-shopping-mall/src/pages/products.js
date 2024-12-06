import "../toggleSidebar.js"
import "../cart/toggleCart.js"
import { getElement } from "../utils.js"
import { store, setupStore } from "../../store.js"
import fetchProducts from "../fetchProducts.js"
import display from "../displayProducts.js"

const init = async () => {
  const loading = getElement(".page-loading")

  if(store.length < 1) {
    const products = await fetchProducts()
    setupStore(products)
  } 
  display(store, getElement(".products-container"))

  loading.style.display = "none "
}

init()