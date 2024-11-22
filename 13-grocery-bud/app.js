const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit mode global variable-----------------------------------

let editElement 
let editFlag = false;
let editId = "";

// Addint Item In the List-------------------------------------
form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setUpItems);

function addItem(e) {
  e.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString();

  if(value !== "" && !editFlag) {

    createListItem(id, value);
    container.classList.add("show-container");
    displayAlert("Item added to the list", "success");
    addToLocalStorage(id, value);
    setBackDefault();
  } else if(value !== "" && editFlag){
    editElement.innerHTML = value;

    displayAlert("Value Changed successfly", "success");

    editLocalStorage(editId, value);

    setBackDefault();

  } else{
    displayAlert("Please enter value", "danger");
  }
}

function deleteItem (e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  displayAlert("Item removed from the list", "danger");

  if(list.children.length === 0) {
    container.classList.remove("show-container");
  }

  setBackDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement

  editElement = e.currentTarget.parentElement.previousElementSibling;

  grocery.value = editElement.innerHTML;

  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "Edit";
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function setBackDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Submit";
}

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if(items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    })
  }

  container.classList.remove("show-container");
  displayAlert("Empty List...", "danger");
  setBackDefault();
}

//  local Storage....

function addToLocalStorage(id, value) {
  const grocery = {id, value};

  let items = getlocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getlocalStorage () {
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocalStorage(id) {
  let items = getlocalStorage();
  
  items = items.filter(function(item) {
    if(item.id !== id) {
      return item;
    }
  })
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getlocalStorage();

  items = items.map(function(item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  })
  localStorage.setItem("list", JSON.stringify(items));
} 

function setUpItems() {
  let items = getlocalStorage();

  if(items.length > 0) {
    items.forEach(function(item) {
      createListItem(item.id, item.value);
    })
    container.classList.add("show-container");
  }
}

function createListItem (id, value) {
  const element = document.createElement("article");
    let attr = document.createAttribute("data-id")
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");

    element.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    list.appendChild(element);

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
}

