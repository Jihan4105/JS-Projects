import "../toggleSidebar.js"
import "../cart/toggleCart.js"
import "../cart/setupCart.js"
import { fetchProduct } from "../fetchProducts.js"
import { singleProductUrl, getElement, formatPrice } from "../utils.js"
import { addToCart } from "../cart/setupCart.js"

// selections 
const loading = getElement(".page-loading")
const centerDOM = getElement(".single-product-center")
const pageTitleDOM = getElement(".page-hero-title")
const imgDOM = getElement(".single-product-img")
const titleDOM = getElement(".single-product-title")
const companyDOM = getElement(".single-product-company")
const priceDOM = getElement(".single-product-price")
const colorsDOM = getElement(".single-product-colors")
const descDOM = getElement(".single-product-desc")
const cartBtn = getElement(".addToCartBtn")

// cart product
let productID 

window.addEventListener("DOMContentLoaded", async () => {
  let urlID = window.location.search;
  let param = new URLSearchParams(urlID);
  productID = param.get('id');
  try {
    const product = await fetchProduct(productID)

    if(product) {
      const {id, name, compnay, price, colors, description, image} = product

      pageTitleDOM.textContent = `Home / ${name}`
      imgDOM.src = `${image}`
      titleDOM.textContent = name
      companyDOM.textContent = compnay
      priceDOM.textContent = formatPrice(price)
      descDOM.textContent = description
      colors.forEach((color) => {
        const span = document.createElement("span")
        span.classList.add("product-color")
        span.style.backgroundColor = `${color}`
        colorsDOM.appendChild(span)
      })

    } else {
      centerDOM.innerHTML = ` 
        <div>
          <h3 class="error">Sorry, Something went wrong</h3>
          <a href="index.html" class="btn">back home</a>
        </div>
      `
    }
  } 
  catch (error) {
    console.log(error)
  } 

  loading.style.display = "none"
})

cartBtn.addEventListener("click", function () {
  addToCart(productID)
})
