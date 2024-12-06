import { getElement } from "./src/utils.js";
import fetchProducts from "./src/fetchProducts.js";
import display from "./src/displayProducts.js";
import "./src/toggleSidebar.js"
import "./src/cart/toggleCart.js"

const init = async () => {
  const products = await fetchProducts()

  if(products) {
    const featured = products.filter((product) => product.featured === true)
    display(featured, getElement(".featured-center"))
  }
}

window.addEventListener("DOMContentLoaded", init)