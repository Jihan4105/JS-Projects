import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement
} from "../utils.js"

import { openCart } from "./toggleCart.js"
import { findProduct } from "../../store.js"
import addToCartDOM from "./addToCartDOM.js"

const cartItemCountDOM = getElement(".cart-item-count")
const cartItemsDOM = getElement(".cart-items")
const cartTotalDOM = getElement(".cart-total")

let cart = getStorageItem("cart")

//추가될 cartItem의 id를 받아서 추가하거나 증가시켜주는 함수.
export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id)
  
  if(!item) {
    let product = findProduct(id)
    product = {...product, amount: 1}
    cart = [...cart, product]
    addToCartDOM(product)
  } else {
    const amount = increaseAmount(id)
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")]
    const newAmount = items.find((value) => value.dataset.id === id)
    newAmount.textContent = amount 
  }

  displayCartItemCount()
  displayCartTotal()
  setStorageItem("cart", cart)
  openCart()
}

//아이템 양을 하나 늘려서 cart변수에 update 해주는 함수.
function increaseAmount(id) {
  let newAmount 
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = {...cartItem, amount: newAmount}
    }
    return cartItem
  })
  return newAmount
}

//아이템의 양을 하나 줄여서 cart변수에 update 해주는 함수.
function decreaseAmount(id) {
  let newAmount
  cart = cart.map((cartItem) => {
    if(cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = {...cartItem, amount:newAmount}
    }
    return cartItem;
  })
  return newAmount
}

//바뀐 선택한 전체 아이템의 갯수를 Navbar의 cart-icon 위의 span DOM 업데이트 해줌.
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount)
  }, 0)

  cartItemCountDOM.textContent = amount;
}

//바뀐 선택한 전체 아이템의 총값을 DOM에 업데이트해줌
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount)
  }, 0)

  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}

//바뀐 cart를 실제로 HTML에 뿌려주는 함수인 addToCartDOM을 호출하는 함수
function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem)
  })
}

//id를 받아서 같은 id인 아이템을 cart 목록에서 없애주는 함수
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id)
}

//cartItem들의 증가, 감소, 제거 버튼의 eventHandler를 정의해주는 함수.
function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target
    const parent = e.target.parentElement
    const id = e.target.dataset.id
    const parentID = e.target.parentElement.dataset.id
    
    //remove
    if(element.classList.contains("cart-item-remove-btn")) {
      removeItem(id)
      element.parentElement.parentElement.remove()
    }
    //increase
    if(parent.classList.contains("cart-item-increase-btn")){
      const newAmount = increaseAmount(parentID)
      parent.nextElementSibling.textContent = newAmount
    }
    //decrease
    if(parent.classList.contains("cart-item-decrease-btn")){
      const newAmount = decreaseAmount(parentID)
      if(newAmount === 0) {
        removeItem(parentID)
        parent.parentElement.parentElement.remove()
      }
      else{
        parent.previousElementSibling.textContent = newAmount
      }
    }
    displayCartItemCount()
    displayCartTotal()
    setStorageItem("cart", cart)
  })
}


const init = () => {
  //Navbar의 cart span 업데이트. 
  displayCartItemCount()

  //보이지 않는 cart Sidebar의 Total 업데이트 => 그래야 전개했을때 저장된 total 값이 보일 수 있음.
  displayCartTotal()

  //보이지 않는 cart Sidebar에 items DOM 뿌리기 => 그래야 전개했을때 저장된 item들이 보일 수 있음.
  displayCartItemsDOM()

  //보이지 않는 cart Sidebar의 증가, 감소, 제거 버튼에 eventHandler를 달아줌.
  setupCartFunctionality()
}

init()