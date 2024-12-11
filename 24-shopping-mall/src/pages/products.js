import "../toggleSidebar.js"
import "../cart/toggleCart.js"
import { getElement } from "../utils.js"
import { store, setupStore } from "../../store.js"
import fetchProducts from "../fetchProducts.js"
import display from "../displayProducts.js"

import setupSearch from "../filters/search.js"
import setupCompanies from "../filters/companies.js"
import setupPrice from "../filters/price.js"

const init = async () => {
  const loading = getElement(".page-loading")

  if(store.length < 1) {
    const products = await fetchProducts()
    setupStore(products)
    display(products, getElement(".products-container"))
    setupSearch(products)
    setupCompanies(products)
    setupPrice(products)
  } 
  else {
    display(store, getElement(".products-container")) 
    setupSearch(store)
    setupCompanies(store)
    setupPrice(store)
  }

  loading.style.display = "none "
}

init()